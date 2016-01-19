// CREATING NEW TASK OBJECT ON PARSE

Parse.initialize("h3VptmPxCmRn1FAyXq7n7wCKCaJZqYe81JGyFDfd", "3wdnInD49VFKNXfMGeCJst7NigXwp3sF4bRsmts3");
var Task = Parse.Object.extend("Task", {
    id: 0, title: '', description: ''
}
);

// Create some example Tasks on the cloud

//for (i = 0; i <= 5; i++) {
//    var newTask = new Task();
//
//    var title = 'Task ' + i;
//    var description = 'Description ' + i;
//
//    newTask.set('title', title);
//    newTask.set('description', description);
//    newTask.save(null, {
//        success: function (savedTask) {
//            console.log(savedTask);
//            // The object was saved successfully.
//        },
//        error: function (Task, error) {
//            console.log(error);
//        }
//    });
//}