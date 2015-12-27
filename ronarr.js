(function (window, document) {
    'use strict';

    var maxDepth = 4;

    // TODO: add AMD support
    window.ronarr = {
        init: function () {
            return this;
        },

        output: function (object, depth, element) {
            var arrayToOutput, levelEl, divNodeParent, child,
                i, j, k;

            if (depth === undefined) depth = 0;

            if ((depth++) >= maxDepth) {
                depth = 0;
                return;
            }

            if (object && object.toString().indexOf('[object') !== -1) { // TODO: better check if object
                arrayToOutput = Object.keys(object);
            } else {
                if (!object || object.length === 0 || typeof(object) === 'string') {
                    throw new Error('Object is unprocessable.');
                }
                arrayToOutput = object; // we assume it is an Array
            }

            function createEl(id, elClass, content) {
                var el;

                el = document.createElement('div');
                el.id = id;
                el.className = elClass;
                el.innerHTML = content;

                return el;
            }

            function clickHandler (e) {
                var target, expanded, idx;

                e.stopPropagation();

                target = e.target || e.srcElement;

                while (target.id.indexOf('level') === -1) {
                    target = target.parentNode;
                }

                if (target.className.indexOf('expanded') !== -1 ){
                    target.className = target.className.replace(/(\s|^)expanded(\s|$)/, '');
                } else {
                    target.className += ' expanded';
                }
            }

            levelEl = document.getElementById('level'); // TODO: remove "used" element

            if (levelEl && levelEl.parentNode)
                levelEl.parentNode.removeChild(levelEl);

            levelEl = createEl('level' + depth, 'test-class', '<h2>' + object.constructor.name + '</h2><div class="test-body"></div>');

            if (element) {
                element.appendChild(levelEl);
            }
            else {
                document.body.appendChild(levelEl);
            }

            if (typeof addEventListener === 'function') // TODO: add IE support
                levelEl.addEventListener('click', clickHandler, false);

            for (i = 0; i < arrayToOutput.length; i++) {
                var elBody = levelEl.getElementsByTagName('div')[0],
                    childEl;

                if (object[arrayToOutput[i]] && Object.keys(object[arrayToOutput[i]]).length && typeof(object[arrayToOutput[i]]) !== 'string') {
                    ronarr.output(object[arrayToOutput[i]], depth, elBody); // if object
                } else {
                    if (arrayToOutput[i].length && typeof arrayToOutput[i] !== 'string') { // if array
                        ronarr.output(arrayToOutput[i], depth, elBody); // if nested
                    } else {
                        childEl = createEl('element-' + i, 'array-element', '<p>' + arrayToOutput[i] + '</p>');
                        elBody.appendChild(childEl);
                    }
                }
            }
        }
    }
})(window, document);
