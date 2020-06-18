const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance =  async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
    $limit: 10
  };
  if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
    return res.status(404).json({"message": "lng and query parameters are required"});
  }
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      }
    ]);
    const locations = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}`
      }
    });
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json(err);
  }
};

const locationsCreate = (req, res) => {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ]
    },
    openingTimes: [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }
    ]
  }, (err, location) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(location);
    }
  });
};

const locationsReadOne = (req, res) => {
  Loc
    .findById(req.params.locationid)
    .exec((err, location) => {
      if (!location) {
        return res.status(404).json({"message": "location not found"});
      } else if (err) {
        return res.status(404).json(err);
      }
      res.status(200).json(location);
    });
};

const locationsUpdateOne = (req, res) => {
  if (!req.params.locationid) {
    return res.status(404).json({"message": "Not found, locaitonid is required"});
  }
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec((err, location) => {
      if (!location) {
        return res.json(404).status({"message": "locationid not found"});
      } else if (err) {
        return res.status(400).json(err);
      }

      if (location.reviews && location.reviews.length > 0) {
        const thisReview = location.reviews.id(req.params.reviewid);
        if (!thisReview) {
          res.status(404).json({"message": "Review not"})
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save((err, location) => {
            if (err) {
              res.status(404).json(err);
            } else {
              updateAverageRating(location._id);
              res.status(200).json(thisReview);
            }
          });
        }
      } else {
        res.status(404).json({"message": "No review to update"});
      }

      location.name = req.body.name;
      locationaddress = req.body.address;
      location.facilities = req.body.facilities.split(',');
      location.coords = {
        type: "Point",
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      location.openTimes = [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }];
      location.save((err, loc) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(loc);
        }
      });
    });
};

const locationsDeleteOne = (req, res) => {
  const {locationid} = req.params;
  if (locationid) {
    Loc
      .findByIdAndRemove(locationid)
      .exec((err, location) => {
        if (err) {
          return res.status(404).json(err);
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({"message": "No location"});
  }
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};