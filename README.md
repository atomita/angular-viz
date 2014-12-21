angular-viz.js
===========

This is a module for using [Viz.js](https://github.com/mdaines/viz.js/) on AngularJS.

## example

```coffee
# app.coffee

app = angular.module("app", ["atVizJs"])

# using provider.
app.config(["vizJsProvider", (provider)->
	# set common option.
	provider.option(
		format: "svg"
		engine: "dot"
	)

	# enable language-dot directive.
	provider.enableLanguageDirective()
])


# using on controller.
app.controller("ctrl", ["$scope", "$sce", "vizJs", ($scope, $sce, viz)->
	$scope.svg = $sce.trustAsHtml(viz.render("digraph { a -> b; }"))
])
```

```html
<!doctype html>
<html ng-app="app">
    <head>
        <script src="bower_components/viz/index.js"></script>
        <script src="bower_components/angular/angular.js"></script>
        <script src="bower_components/angular-viz/angular-viz.js"></script>
        <script src="app.js"></script>
    </head>
    <body>
        <!-- using on controller. -->
        <div ng-controller="ctrl">
            <div ng-bind-html="svg"></div>
        </div>

        <!-- using directive by element. -->
        <dot>
            digraph { c -> d; }
        </dot>

        <!-- using directive by attribute. -->
        <div dot>
            digraph { e -> f; }
        </div>

        <!-- using directive by attribute with value. -->
        <div ng-init="code='digraph { g -> h; }'" dot="{{code}}">
        </div>

        <!-- using directive by class "language-dot". -->
        <pre><code class="language-dot">
            digraph { i -> j; }
        </code></pre>
    </body>
</html>
```
