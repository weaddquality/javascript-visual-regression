exports.hide = async function(settings, page) {
  if (!(settings.hideElements === undefined) && !(settings.hideElements.length === 0)) {
    await Promise.all(
      settings.hideElements.map(function(element) {
        page.evaluate(function(element) {
          document.querySelector(element).style.setProperty('visibility', 'hidden');
        }, element);
      }));
  }
};

exports.remove = async function(settings, page) {
  if (!(settings.removeElements === undefined) && !(settings.removeElements.length === 0)) {
    await Promise.all(
      settings.removeElements.map(function(element) {
        page.evaluate(function(element) {
          document.querySelector(element).style.setProperty('display', 'none');
        }, element);
      }));
  }
};
