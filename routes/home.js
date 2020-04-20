var express = require("express");
var router = express.Router();
var spawn = require("child_process").spawn;


// test@g.c
// 123
// ID: 101679

router.get("/", function (req, res) {
    if (req.session.loggedIn != true ) {
        res.redirect("/");
    } else {
        res.render("home");
    }
});


router.get("/profile", function (req, res) {
    if (req.session.loggedIn == true) {
        const connection = req.app.locals.connection;
        connection.query("SELECT * FROM `student` WHERE `student_id` = ?;", [req.session.studentId], function (error, student) {
            connection.query("SELECT * FROM `level` WHERE `level_id` = ?;", [student[0].level_id], function (error, level) {
                connection.query("SELECT * FROM `term` WHERE `term_id` = ?;", [student[0].start_term], function (error, term) {
                    connection.query("SELECT * FROM `plan_of_study` WHERE `plan_id` = ?;", [student[0].plan_id], function (error, plan) {
                        connection.query("SELECT * FROM `degree` WHERE `degree_id` = ?;", [student[0].degree_id], function (error, degree) {
                            res.render("profile", {
                                "level": level,
                                "term": term,
                                "plan": plan,
                                "degree": degree,
                                "email": student[0].email,
                                "name": student[0].name,
                                "username": student[0].username,
                                "age": student[0].age,
                                "gender": student[0].gender,
                                "status": student[0].active
                            }, function (err, html) {
                                res.send(html);
                            });
                        });
                    });
                });
            });
        });
    }
});

router.get("/history", function (req, res) {
    if (req.session.loggedIn == true) {
        const connection = req.app.locals.connection;
        connection.query("SELECT * FROM `taken_course` WHERE `student_id` = ?;", [req.session.studentId], function (error, courses) {
            var courseIds = courses.map(function (course) { return course.course_id; });
            var queryData = [courseIds];
            connection.query("SELECT * FROM `course` WHERE `course_id` IN (?);", queryData, function (error, takenCourseInfo) {
                connection.query("SELECT * FROM `level`;", queryData, function (error, allLevelInfo) {
                    connection.query("SELECT * FROM `term`;", queryData, function (error, allTermInfo) {
                        connection.query("SELECT * FROM `course`;", queryData, function (error, allCourseInfo) {
                            connection.query("SELECT * FROM `grade`;", queryData, function (error, allGradeInfo) {
                                res.render("history", {
                                    takenCourses: takenCourseInfo,
                                    allLevels: allLevelInfo,
                                    allTerms: allTermInfo,
                                    allCourses: allCourseInfo,
                                    allGrades: allGradeInfo
                                }, function (err, html) {
                                    res.send(html);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});

router.post("/addCourse", function (req, res) {
    if (req.session.loggedIn == true) {
        const connection = req.app.locals.connection;
        connection.query("INSERT INTO `taken_course` (`student_id`, `level_id`, `term_id`, `course_id`, `grade_code`) VALUES (?, ?, ?, ?, ?);", [req.session.studentId, req.body.levelId, req.body.termId, req.body.courseId, req.body.gradeId], function (error, result) {
            res.redirect("/home");
            // res.render("", {

            // }, function (err, html) {
            //     res.send(html);
            // });
        });
    }
});

router.get("/recommend", function (req, res) {
//    if (req.session.loggedIn == true) {
        const connection = req.app.locals.connection;


        var dataToSend;
        const python = spawn("python", ["./scripts/hello.py", req.query.studentId]);
        python.stdout.on("data", function (data) {
            console.log("Pipe data from python script ...");
            dataToSend = data.toString();
        });
        python.on("close", function (code) {
            console.log(`child process close all stdio with code ${code}`);
            res.send(dataToSend)
        });

        // RUN PYTHON SCRIPTS with "req.session.studentId"
        // GET COURSE IDs FROM SCRIPTS





        // var queryData = [courseIds];
        // connection.query("SELECT * FROM `course` WHERE `course_id` IN (?);", queryData, function (error, courses) {
        //     res.render("recommendations", {
        //         recommendCourses: courses
        //         // reasons: 
        //     }, function (err, html) {
        //         res.send(html);
        //     });
        // });
//    }
});


router.get("/test", function (req, res) {
    var dataToSend;
    var python = spawn("python", ["./scripts/hello.py", "node.js", "python"]);
    python.stdout.on("data", function (data) {
        console.log("Pipe data from python script ...");
        dataToSend = data.toString();
    });
    python.on("close", function (code) {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });
});

module.exports = router;