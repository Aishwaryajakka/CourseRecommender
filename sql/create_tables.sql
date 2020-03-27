/*


*/

CREATE DATABASE COURSE_RECOMMENDER;
USE COURSE_RECOMMENDER;

/* Term codes infomation */
CREATE TABLE IF NOT EXISTS TERM (
    term_id int(4) NOT NULL,
    semester varchar(15) NOT NULL,
    year int(4),
    primary key(term_id)

);

/* Degree Table */
CREATE TABLE IF NOT EXISTS DEGREE(
    degree_id int(11) NOT NULL,
    degree_name varchar(50) NOT NULL,
    primary key(degree_id)
);

/* Plan of Study Table*/
CREATE TABLE IF NOT EXISTS PLAN_OF_STUDY(
    plan_id int(11) NOT NULL,
    plan_of_study varchar(50) NOT NULL,
    primary key(plan_id)
);


 /* Level Table */
CREATE TABLE IF NOT EXISTS LEVEL(
    level_id varchar(2) NOT NULL,
    level_name varchar(50) NOT NULL,
    primary key(level_id)
);

/* Grade codes Table */
CREATE TABLE IF NOT EXISTS GRADE(
    grade_code varchar(2) NOT NULL,
    quality_points float(2,2) NOT NULL,
    description varchar(50),
    primary key(grade_code)
);


/* This table contains the details regarding the stduents seeking to find course recommendations  */
CREATE TABLE IF NOT EXISTS STUDENT(
 student_id int(30) NOT NULL AUTO_INCREMENT,
 email varchar(60) NOT NULL,
 full_name varchar(60) NOT NULL,
 username varchar(30) NOT NULL,
 password varchar(30) NOT NULL,
 age int(2) NOT NULL,
 gender varchar(1) NOT NULL,
 start_term int(4) NOT NULL DEFAULT 2204,
 plan_id int(11) NOT NULL,
 level_id varchar(2) NOT NULL,
 degree_id int(11) NOT NULL,
 active varchar(1) DEFAULT 'N',
 primary key(student_id),
 foreign key(start_term) references TERM(term_id),
 foreign key(plan_id) references PLAN_OF_STUDY(plan_id),
 foreign key(level_id) references LEVEL(level_id),
 foreign key(degree_id) references DEGREE(degree_id)
);
ALTER TABLE
    STUDENT AUTO_INCREMENT = 100;

/* Course Description table */

CREATE TABLE IF NOT EXISTS COURSE(
  course_id int(11) NOT NULL,
  name varchar(30) NOT NULL,
  description varchar(60) ,
  degree_id int(11) NOT NULL,
  level_id varchar(2) NOT NULL,
  primary key(course_id),
  foreign key(level_id) references LEVEL(level_id),
  foreign key(degree_id) references DEGREE(degree_id)
);

/* The courses taken by the students and the grade achieved */
CREATE TABLE IF NOT EXISTS TAKEN_COURSES(
  student_id int(30) NOT NULL,
  course_id int(11) NOT NULL,
  term_id int(4) NOT NULL,
  level_id varchar(2) NOT NULL,
  grade_code varchar(2) NOT NULL,
  primary key(student_id,course_id),
  foreign key(term_id) references TERM(term_id),
  foreign key(level_id) references LEVEL(level_id),
  foreign key(grade_code) references GRADE(grade_code)
);
