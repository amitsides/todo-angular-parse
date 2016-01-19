"use strict";
/* TasksApp Module */
var TasksApp = angular.module('TasksApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.
                    when('/main', {templateUrl: '/js/FE/Templates/tasksList.html', controller: 'mainController'}).
                    when('/task/:taskId', {templateUrl: '/js/FE/Templates/task.html', controller: 'taskController'}).
                    otherwise({
                        redirectTo: '/main'
                    });
        })
        .controller('mainController', ['$scope', function ($scope) {

                $scope.tasks = new Array();

                $scope.addTask = function () {
                    var newTask = new Task();
                    var newTaskTitle = $scope.taskTitle;
                    var description = 'Edit Description';
                    newTask.set('title', newTaskTitle);
                    newTask.set('description', description);

                    var newTaskId = 0;
                    newTask.save(null, {
                        success: function (savedTask) {
                            // The object was saved successfully.
                            $scope.tasks.push({title: newTaskTitle, id: savedTask.id});
                            console.log(savedTask.id);
                        },
                        error: function (Task, error) {
                            console.log(error);
                        }
                    });

                    $scope.count++;
                };

                // QUERY ALL TASKS
                var newTask = new Task();
                var query = new Parse.Query(newTask);
                query.find({
                    success: function (results) {
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                            var objectTitle = object.get('title');
                            $scope.tasks.push({id: object.id, title: object.get('title')});
                        }
                    },
                    error: function (error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });

                console.log($scope.tasks);
            }
        ])
        .controller('taskController', ['$scope', '$routeParams', function ($scope, $routeParams) {

                var taskId = $routeParams.taskId;
                $scope.id = taskId;

                var loadTask = Parse.Object.extend("Task");
                var query = new Parse.Query(loadTask);
                $scope.title = '';
                $scope.description = '';
                query.get(taskId, {
                    success: function (results) {
                        $scope.title = results.get('title');
                        $scope.description = results.get('description');
                    },
                    error: function (object, error) {
                        console.log(error);
                    }
                });

                $scope.updateTask = function () {
                    var newTask = new Task();
                    var query = new Parse.Query(newTask);
                    query.get($scope.id, {
                        success: function (taskObject) {
                            taskObject.set('title', $scope.title);
                            taskObject.set('description', $scope.description);
                            taskObject.save();
                            console.log(taskObject);
                        },
                        error: function (error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });


                };
//                $scope.$watch('title', function (value) {
//
//                });
//                $scope.$watch('description', function (value) {
//
//                });
            }]);
        