function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
}


function PrimaryStudent(props){
    Student.call(this,props)
    this.grade = props.grade || 1;
}

function inherits(Child, Parent,cb) {
    var F = function () {};
    // 把F的原型指向父对象的prototype:
    F.prototype = Parent.prototype;
    // 把子对象的原型指向一个新的F对象，F对象的原型正好指向父对象的prototype:
    Child.prototype = new F();
    // 把子对象原型的构造函数修复为自己:
    Child.prototype.constructor = Child;
    typeof cb === 'function' ? cb() : null
}



inherits(PrimaryStudent,Student,function(){
    PrimaryStudent.prototype.getGrade = function () {
        return this.grade;
    };
});

var foo = new PrimaryStudent({grade:5})


console.log(foo.grade)
console.log(foo.name)
console.log(foo)