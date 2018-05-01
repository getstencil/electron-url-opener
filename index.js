const electron = require('electron');

/**
 * ElectronUrlOpener
 * 
 * @abstract
 */
module.exports = (function() {

    /**
     * __callback
     * 
     * @access  private
     * @var     Function (default: null)
     */
    var __callback = null;

    /**
     * __listenForLaunchingEvent
     * 
     * @access  private
     * @return  Promise
     */
    var __listenForLaunchingEvent = function() {
        return new Promise(function(resolve, reject) {
            electron.app.on(
                'will-finish-launching',
                function() {
                    resolve();
                }
            );
        });
    };

    /**
     * __listenForOpenUrlEvents
     * 
     * @access  private
     * @return  void
     */
    var __listenForOpenUrlEvents = function() {
        electron.app.on(
            'open-url',
            function(event, url) {
                event.preventDefault();
                if (electron.app.isReady() === false) {
                    electron.app.on(
                        'ready',
                        function() {
                            __callback(url);
                        }
                    );
                } else {
                    __callback(url);
                }
            }
        );
    };

    // Public
    return {

        /**
         * init
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        init: function(callback) {
            __callback = callback;
            __listenForLaunchingEvent().then(function() {
                __listenForOpenUrlEvents();
            });
        }
    };
})();
