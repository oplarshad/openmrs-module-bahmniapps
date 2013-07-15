'use strict';

angular.module('opd.treeSelect')
    .directive('treeSelector', ['conceptTreeService', 'nodeSelectionService', function (conceptTreeService, nodeSelectionService) {
        var link = function($scope, elem) {
            (function() {
                conceptTreeService.getConceptTree($scope.rootConceptName).then(function(conceptTree) {
                    $scope.conceptExplorer = new Bahmni.Opd.TreeSelect.Explorer(conceptTree);
                });
                var kbNavigation = Bahmni.Opd.TreeSelect.KeyboardNavigation;
                $('.opd-tree-selector').focus(function() {kbNavigation.addKeyboardHandlers($scope, nodeSelectionService)});
                $('.opd-tree-selector').focusout(function() {kbNavigation.removeKeyboardHandlers()});
                $('.opd-tree-selector').focus();
            })();

            $scope.expandNode = function(node, column) {
                $scope.conceptExplorer.focus(node, column);
                $scope.toggleNodeSelection(node, column);
            }

            $scope.toggleNodeSelection = function(node, column) {
                var selectedNode = $scope.conceptExplorer.toggleSelectionForFocusedNode();
                nodeSelectionService.toggleSelection(selectedNode);
            }

            $scope.getClass = function(node) {
                return node.isFocused() ? "focus" : "";
            }

            $scope.getSelectionClass = function(node) {
                if(node.isSelected()) {
                    return node.isFocused() ? "icon-white icon-ok" : "icon-ok";
                }
                return "";
            }

        };

        return {
            restrict: 'A',
            templateUrl: 'modules/tree-select/views/treeSelector.html',
            link: link,
            scope: {
                rootConceptName: "="
            }
        };
    }]);
 