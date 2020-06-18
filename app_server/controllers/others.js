/* Get about page */
const about = (req, res) => {
  res.render('generic-text', {
    title: 'About',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit \
      amet felis eget nisl finibus vehicula ut vitae ipsum. Vivamus vel arcu vel ipsum ultricies \
      consequat. Fusce maximus sem eget felis tincidunt porta. Curabitur fermentum elit mi, \
      varius malesuada tellus pharetra a. In accumsan tortor nec mi vehicula, ut dignissim nisi\
      tempus. Suspendisse ac consequat mi, ac vehicula odio. Vivamus sollicitudin dolor ante, \
      \n\n ac viverra augue laoreet quis. Integer fringilla ac quam eget lacinia. Ut nunc tellus, \
      dictum vitae sagittis non, tempor ut ante. Phasellus tempor vulputate nunc, sit amet tempor nisi mattis sed. \
      Suspendisse eget erat ante. Integer efficitur turpis vitae ligula aliquam, quis ultricies dui pulvinar. \
      Pellentesque volutpat dignissim arcu ut tristique. Praesent lobortis eget dolor et malesuada. \
      Donec ullamcorper cursus interdum."
  });
};

module.exports = {
  about
};