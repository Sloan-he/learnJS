/**
 * Created by Admin on 2017/10/20.
 */
class Student {
    constructor(props) {
        this.name = props.name || 'Unnamed';
    }

    hello() {
        console.log('Hello, ' + this.name + '!');
    }
}

class PrimaryStudent extends Student {
    constructor(props) {
        super(props); // 记得用super调用父类的构造方法!
        this.grade = props.grade || 1;
    }

    myGrade() {
        console.log('I am at grade ' + this.grade);
    }
}


var temp = new PrimaryStudent({grade:3})

console.log(temp)
temp.myGrade()
temp.hello()