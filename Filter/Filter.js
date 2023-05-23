function applyFilter() {
    var selectedMainTitles = getSelectedValues('main-titles');
    var selectedSubTitles = getSelectedValues('sub-titles');
    var selectedManagement = getSelectedValues('management');
    var selectedLocation = getSelectedValues('location');
    var selectedLevel = getSelectedValues('level')
  
    var products = document.querySelectorAll('#products .product');
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      var mainTitle = product.getAttribute('data-main-title');
      var subTitle = product.getAttribute('data-sub-title');
      var management = product.getAttribute('data-management');
      var location = product.getAttribute('data-location');
      var level = product.getAttribute('data-level');

      if (

        (selectedMainTitles.length === 0 || selectedMainTitles.includes(mainTitle)) &&
        (selectedSubTitles.length === 0 || selectedSubTitles.includes(subTitle)) &&
        (selectedManagement.length === 0 || selectedManagement.includes(management)) &&
        (selectedLocation.length === 0 || selectedLocation.includes(location)) &&
        (selectedLevel.length === 0 || selectedLevel.includes(level))
        ) {
          product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
    }
  }
  
  function getSelectedValues(id) {
    var checkboxes = document.querySelectorAll('#' + id + ' input[type="checkbox"]');
    var selectedValues = [];
    
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedValues.push(checkboxes[i].value);
      }
    }
    
    return selectedValues;
  }
  