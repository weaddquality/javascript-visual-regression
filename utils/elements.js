exports.hide = async function(settings, page) {
  await Promise.all(
    settings.hideElements.map(function(element) {
      page.evaluate(function(element) {
        document.querySelector(element).style.setProperty('visibility', 'hidden');
      }, element);
    }));
};

exports.remove = async function(settings, page) {
  await Promise.all(
    settings.removeElements.map(function(element) {
      page.evaluate(function(element) {
        document.querySelector(element).style.setProperty('display', 'none');
      }, element);
    }));
};
