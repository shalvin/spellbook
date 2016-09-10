define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Spells';
            config.map([
                { route: '', moduleId: 'no-selection', title: 'Select' },
                { route: 'spells/:id', moduleId: 'spell-detail', name: 'spells' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSelection = (function () {
        function NoSelection() {
            this.message = "Select a Spell";
        }
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
});

define('web-api',["require", "exports", 'aurelia-fetch-client'], function (require, exports, aurelia_fetch_client_1) {
    "use strict";
    var latency = 200;
    var id = 0;
    var httpClient = new aurelia_fetch_client_1.HttpClient();
    function generateId() {
        return ++id;
    }
    var spells = [];
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
            httpClient.fetch('spells.json')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                spells = data.spellList;
                for (var _i = 0, spells_1 = spells; _i < spells_1.length; _i++) {
                    var spell = spells_1[_i];
                    spell.id = generateId();
                }
                console.log("[WebAPI] Loaded spells");
            });
        }
        WebAPI.prototype.getSpellList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(spells);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getSpellDetails = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = spells.filter(function (x) { return x.id == id; })[0];
                    resolve(JSON.parse(JSON.stringify(found)));
                    _this.isRequesting = false;
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('spell-list',["require", "exports", './web-api', 'aurelia-framework'], function (require, exports, web_api_1, aurelia_framework_1) {
    "use strict";
    var SpellList = (function () {
        function SpellList(api) {
            this.api = api;
            this.selectedId = 0;
        }
        SpellList.prototype.created = function () {
            var _this = this;
            this.api.getSpellList().then(function (spells) { return _this.spells = spells; });
        };
        SpellList.prototype.select = function (spell) {
            this.selectedId = spell.id;
            return true;
        };
        SpellList = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI), 
            __metadata('design:paramtypes', [web_api_1.WebAPI])
        ], SpellList);
        return SpellList;
    }());
    exports.SpellList = SpellList;
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./spell-list\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Spells</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <contact-list class=\"col-md-4\"></contact-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n  </div>\n</template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!contact-list.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"spell-list\">\r\n    <ul class=\"list-group\">\r\n      <li repeat.for=\"spell of spells\" class=\"list-group-item ${contact.id === $parent.selectedId ? 'active' : ''}\">\r\n        <a route-href=\"route: spells; params.bind: {id:spell.id}\" click.delegate=\"$parent.select(spell)\">\r\n          <h4 class=\"list-group-item-heading\">${spell.spellName}</h4>\r\n          <!--<p class=\"list-group-item-text\">${contact.email}</p>-->\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n"; });
define('text!no-selection.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"no-selection text-center\">\n        <h2>${message}</h2>\n    </div>\n</template>\n"; });
define('text!spell-list.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"spell-list\">\r\n    <ul class=\"list-group\">\r\n      <li repeat.for=\"spell of spells\" class=\"list-group-item ${contact.id === $parent.selectedId ? 'active' : ''}\">\r\n        <a route-href=\"route: spells; params.bind: {id:spell.id}\" click.delegate=\"$parent.select(spell)\">\r\n          <h4 class=\"list-group-item-heading\">${spell.spellName}</h4>\r\n          <!--<p class=\"list-group-item-text\">${contact.email}</p>-->\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map