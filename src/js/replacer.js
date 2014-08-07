/*!
 * Replacer (http://paKanhu.github.io/replacer)
 * Copyright 2014 Prasannajit Acharya - Kanhu
 * Licensed under MIT (http://paKanhu.github.io/replacer/LICENSE.md)
 */

window.onload = function() {
  var template;
  var templateTextList;
  var replacementTextList;
  var result;

  var caseSensitive = false;

  removeLinkFromSteps();

  // Step 1 - Method 1
  document.getElementById("get-template-method1").onclick = function() {
    var templateMethod1 = document.getElementById("template-method1");
    if (templateMethod1.value.trim()) {
      template = '';
      template = templateMethod1.value;
      initializeApp();
      console.log('Template: \n' + template);

      addLinkToStep('collapseOne');
      showNextStep('collapseTwo');

      confirmBeforeLeave(true);
    } else {
      showError('Please provide a template.');
    }
  };

  // Step 2 - Method 1
  document.getElementById("get-template-text-method1").onclick = function() {
    var templateTextPatternString = document.getElementById("template-text-pattern").value;
    if (templateTextPatternString.trim()) {
      var templateTextPatternCase = document.getElementById("template-text-pattern-case");
      caseSensitive = templateTextPatternCase.checked;
      var templateTextPatternRegEx = new RegExp(templateTextPatternString, (caseSensitive ? "g" : "gi"));
      templateTextList = [];
      templateTextList = template.match(templateTextPatternRegEx);
      if (templateTextList) {
        if (caseSensitive) {
          templateTextList = removeDuplicates(templateTextList);
        } else {
          for (var i = 0; i < templateTextList.length; i++) {
            templateTextList[i] = templateTextList[i].toLowerCase();
          }
          templateTextList = removeDuplicates(templateTextList);
        }
        console.log('Template Text List: \n' + templateTextList);

        showNextStep('collapseThree');
        showTemplateList();
      } else {
        showError('There is no match for this template text pattern.');
      }
    } else {
      showError('Template text pattern must not be empty.');
    }
  };

  // Step 3 - Method 1
  document.getElementById("get-result-method1").onclick = function() {
    replacementTextList = [];
    var replacementTexts = document.getElementsByClassName("replacement-text");
    for (i = 0; i < replacementTexts.length; i++) {
      replacementTextList.push(replacementTexts.item(i).value);
    }
    console.log('Replacement Text List: \n' + replacementTextList);

    if (checkEmptyReplacementText()) {
      storeResult();
      console.log('Result: \n' + result);

      showNextStep('collapseFour');

      confirmBeforeLeave(false);
    } else {
      replacementTextList = [];
    }
  };

  document.getElementById('start-again').onclick = function() {
    document.getElementById("template-method1").value = '';
    initializeApp();
  };


  //-- Other --//

  function showNextStep(showStep) {
    addLinkToStep(showStep);
    var collapseList = ['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour'];
    for (var i = 0; i < collapseList.length; i++) {
      if (collapseList[i] !== showStep) {
        var collapseItem = document.getElementById(collapseList[i]);
        if (collapseItem.classList.contains('in')) {
          $('#' + collapseList[i]).collapse('hide');
        }
      }
    }
    $('#' + showStep).collapse('show');
  }

  function showTemplateList() {
    var templateList = document.getElementById("replacement-text-list");
    var str;
    var templateText;
    templateList.innerHTML = '';
    for (var i = 0; i < templateTextList.length; i++) {
      if (caseSensitive) {
        templateText = templateTextList[i];
      } else {
        templateText = templateTextList[i] + ' <kbd>OR</kbd> ' +
          templateTextList[i].toUpperCase();
      }
      str = '<li>\n\
              <div class="form-horizontal" role="form">\n\
                <div class="form-group">\n\
                  <label class="control-label col-md-5 col-sm-5">' +
        templateText +
        '&nbsp;&rarr;&nbsp;</label>\n\
                  <div class="col-md-4 col-sm-4">\n\
                    <input type="text" class="replacement-text form-control">\n\
                  </div>\n\
                </div>\n\
              </div>\n\
            </li>';
      templateList.innerHTML += str;
    }
  }

  function checkEmptyReplacementText() {
    var emptyReplacementTextCounter = 0;
    for (var i = 0; i < replacementTextList.length; i++) {
      if (!replacementTextList[i].trim()) {
        emptyReplacementTextCounter++;
      }
    }
    if (emptyReplacementTextCounter) {
      confirmationText = 'There is ' + emptyReplacementTextCounter +
        ' empty replacement text/s.\nDo you still want to replace?';
      return confirm(confirmationText);
    }
    return true;
  }

  function storeResult() {
    var resultConatiner = document.getElementById("result-container");
    result = template;
    for (i = 0; i < templateTextList.length; i++) {
      result = result.replace(new RegExp(templateTextList[i], (caseSensitive ? "g" : "gi")), replacementTextList[i]);
    }
    resultConatiner.value = result;
  }

  function showError(errorText) {
    showCustomModal(errorText, 'ERROR');
  }

  function showCustomModal(bodyText, type) {
    var customModal = document.getElementById("customModal");
    var modalTitle = document.getElementById("customModalLabel");
    var modalBody = document.getElementById("customModalBody");

    if (type === 'ERROR') {
      customModal.classList.remove("confirmModal");
      customModal.classList.add("errorModal");
      modalTitle.innerHTML = 'Error';
      modalBody.innerHTML = bodyText;
      $('#customModal').modal('show');
    }
  }

  function removeDuplicates(items) {
    var newItems = [];
    for (var i = 0; i < items.length; i++) {
      if (newItems.indexOf(items[i]) === -1) {
        newItems.push(items[i]);
      }
    }
    return newItems;
  }

  function addLinkToStep(collapseNum) {
    var collapseList = ['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour'];
    var i = collapseList.indexOf(collapseNum);
    var stepTitleLinks = $('.panel-title>a');
    stepTitleLinks[i].href = '#' + collapseNum;
    stepTitleLinks[i].style.color = "";
    stepTitleLinks[i].style.cursor = "";
  }

  function removeLinkFromSteps() {
    var stepTitleLinks = $('.panel-title>a');
    for (var i = 0; i < stepTitleLinks.length; i++) {
      stepTitleLinks[i].href = "";
      stepTitleLinks[i].style.cursor = "default";
      if (i > 0) {
        stepTitleLinks[i].style.color = "lightgrey";
      } else {
        stepTitleLinks[i].style.color = "black";
      }
    }
  }

  function confirmBeforeLeave(FLAG) {
    if (FLAG) {
      window.onbeforeunload = function(e) {
        // If we haven't been passed the event get the event
        e = e || event;
        var message = 'You have got unfinished work. Are you sure to do this?';
        // For IE6-8 and Firefox prior to version 4
        if (e) {
          e.returnValue = message;
        }
        // For Chrome, Safari, IE8+ and Opera 12+
        return message;
      };
    } else {
      window.onbeforeunload = null;
    }
  }

  function initializeApp() {
    templateTextList = [];
    replacementTextList = [];
    document.getElementById("template-text-pattern").value = '';
    document.getElementById("template-text-pattern-case").checked = false;
    document.getElementById("replacement-text-list").innerHTML = '';
    document.getElementById("result-container").value = '';
    showNextStep('collapseOne');
    removeLinkFromSteps();

    console.log('Initializing App ...');
  }
};
