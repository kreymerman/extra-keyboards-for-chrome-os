/*
Copyright 2020 The Extra Keyboards for Chrome OS Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var lut = {
  // see https://w3c.github.io/uievents-code/#code-value-tables
  "Digit3": [ "3", "Ъ" ], // TODO: ³ with Alt Gr
  "Digit4": [ "4", "ъ" ],
  "Digit6": [ "6", "Ь" ],
  "Minus": [ "ь", "?" ], // ß on german keyboard TODO: \ with Alt Gr
  "KeyQ": [ "я", "Я" ], // TODO: @ with Alt Gr
  "KeyW": [ "ж", "Ж" ], // TODO: € with Alt Gr
  "KeyE": [ "е", "Е" ],
  "KeyR": [ "р", "Р" ],
  "KeyT": [ "т", "Т" ],
  "KeyY": [ "з", "З" ], // Z on german keyboard 
  "KeyU": [ "у", "У" ],
  "KeyI": [ "и", "И" ],
  "KeyO": [ "о", "О" ],
  "KeyP": [ "п", "П" ],
  "BracketLeft": [ "ю", "Ю" ], // Ü on german keyboard 
  "BracketRight": [ "ш", "Ш" ], // + on german keyboard TODO: ~ with Alt Gr
  "KeyA": [ "а", "А" ],
  "KeyS": [ "с", "С" ],
  "KeyD": [ "д", "Д" ],
  "KeyF": [ "ф", "Ф" ],
  "KeyG": [ "г", "Г" ],
  "KeyH": [ "ч", "Ч" ],
  "KeyJ": [ "й", "Й" ],
  "KeyK": [ "к", "К" ],
  "KeyL": [ "л", "Л" ],
  "Semicolon": [ "ё", "Ё" ], // Ö on german keyboard
  "Quote": [ "э", "Э" ], // Ä on german keyboard
  "Backslash": [ "щ", "Щ" ], // # on german keyboard
  "KeyZ": [ "ы", "Ы" ], // Y on german keyboard
  "KeyX": [ "х", "Х" ],
  "KeyC": [ "ц", "Ц" ],
  "KeyV": [ "в", "В" ],
  "KeyB": [ "б", "Б" ],
  "KeyN": [ "н", "Н" ],
  "KeyM": [ "м", "М" ] // TODO: tilda with Alt Gr
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      // console.log('onKeyEvent', keyData);
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
