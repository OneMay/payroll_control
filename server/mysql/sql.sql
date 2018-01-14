create database `JXGL`
CREATE TABLE Employee
( 
  EmployeeNO char(10) primary key,
  title varchar(10),
  fistName varchar(4),
  middleName varchar(4),
  lastName varchar(4),
  address varchar(100),
  workTelExt char(4),
  homeTelNo char(11)not null,
  empEmailAddress varchar(20),
  socialSecurutyNumber char(10)unique,
  DOB date,
  position varchar(10),
  sex char(2),
  salary float(1),
  dateStarted date,
  code int(5) not null DEFAULT 50,
  'password' char(10 )  not null DEFAULT '123456',
  constraint c1 check(sex='男'or sex='女')
)

CREATE TABLE BonusType
(
  bonusTypeNo char(4) primary key,
  bonusDescription varchar(200)
)
CREATE TABLE Bonus
(
employeeNo char(10),
bonusDate date,
primary key(employeeNo,bonusDate),
bonusAmount float(5),
bonusTypeNo char(4),
pay char(10) not null DEFAULT 'false',
foreign key (employeeNo) REFERENCES Employee(employeeNo),
foreign key (bonusTypeNo) REFERENCES BonusType(bonusTypeNo)
)
CREATE TABLE DeductType
(
  deductTypeNo char(4) primary key,
  deductDescription varchar(200)
)

CREATE TABLE Deduction
(
  employeeNo char(10),
  deductDate float(6),
  primary key(employeeNo,deductDate),
  deductAmount float(6),
  deductTypeNo char(4),
  pay char(10) not null DEFAULT 'false',
  foreign key (employeeNo) REFERENCES Employee(employeeNo),
  foreign key (deductTypeNo) REFERENCES DeductType(deductTypeNo)
)
CREATE TABLE Holiday
(
  employeeNo char(10) primary key,
  startDate date,
  endDate date,
  foreign key (employeeNo) REFERENCES Employee(employeeNo)
)
CREATE TABLE PayHistory
(
  payNo char(4),
  employeeNo char(10),
  primary key(payNo),
  paydate date,
  checkNumber char(10),
  payAmount float(5),
  foreign key (employeeNo) REFERENCES Employee(employeeNo)
)
CREATE TABLE PayType
(
payTypeNo char(4)primary key,
payTypeDescription varchar(200)
)
CREATE TABLE SickLeave
(
employeeNo char(10),
startDate date,
primary key(employeeNo,startDate),
endDate date,
reason varchar(200),
foreign key (employeeNo) REFERENCES Employee(employeeNo)
)
CREATE TABLE PayDetails
(
employeeNo char(10),
startDate date,
routingNumber char(10),
accountType varchar(10),
bankName varchar(20),
bankAddress char(19),
payTypeNo char(4),
foreign key (employeeNo) REFERENCES Employee(employeeNo),
foreign key (payTypeNo) REFERENCES PayType(payTypeNo)
)