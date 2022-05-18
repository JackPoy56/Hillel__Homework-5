const groupOfStudents = [];
const NUMBER_OF_MARKS = 5;
let groupAverage;
let bestStudent;
let listOfDebtors;

function main() {
    let numberOfStudents; 
    
    do {
        numberOfStudents = +prompt('Яка кількість студентів в групі?', 'Кількість в числах');
    } while (numberOfStudents != numberOfStudents || numberOfStudents === 0);

    getGroupOfStudents(numberOfStudents);
    addMarks(groupOfStudents);

    loop: do {
        const operation = +prompt(`Оберіть операцію:
        1. Отримати самого успішного студента. 
        2. Відсортувати студентів за успішністю.
        3. Розрахувати середню оцінку для кожного студента та роздрукувати.
        4. Отримати студентів на відрахування.
        5. Додати новенького в групу.`)

        if (operation > 0 && operation < 7){
            switch (operation) {
                case 1:
                    getBestStudent(groupOfStudents); 
                    alert(`Кращій учень: ${bestStudent.name} середній бал - ${bestStudent.avgMarks}.`);                     
                    break;

                case 2:
                    getGradeList(groupOfStudents);
                    alert(groupOfStudents);
                    break;

                case 3:
                    getAvgMarksStudents(groupOfStudents);
                    alert(groupOfStudents);
                    if (confirm(`Бажаєте роздрукувати?(повтор операцій буде не можливий)`)){
                        groupOfStudents.join('');
                        document.body.innerHTML += '<p>' + groupOfStudents + '</p>';
                        window.print();
                        break loop;
                    }
                    break;

                case 4:
                    getListOfDebtors(groupOfStudents);
                    alert(listOfDebtors);
                    break;
                    
                case 5:
                    getNewStudents(groupOfStudents);
                    break;
            } 
        }
    } while (confirm(`Повторити операції?`));
}

main();

function getGroupOfStudents(number) {
    for (let i = 0; number > 0 && i < number; i++) { 
        let students = {
            name: prompt(`Введіть П.І.Б ${i + 1} студента!`),           
            marks: [],
            toString: () => `
                П.І.Б.: ${students.name}
                Середній бал: ${students.avgMarks}`    
        }

        if (students.name === '' || students.name === null){
            students.name = 'Анонім';
        }

        groupOfStudents.push(students);
    }     
}

function addMarks(studentGroup) {
    for (let i of studentGroup){                
        do {
            i['marks'].push(Math.ceil(Math.random(13) * 10));
        } while (i['marks'].length < NUMBER_OF_MARKS);
    }   
}

function getBestStudent(studentGroup) {
    getAvgMarksStudents(groupOfStudents);
    bestStudent = studentGroup[0];

    for (let i = 1; i < studentGroup.length; i++){
        if (bestStudent.avgMarks < studentGroup[i].avgMarks){
            bestStudent = studentGroup[i];
        }        
    } 
}

function getGradeList(studentGroup) {
    getAvgMarksStudents(groupOfStudents);
    
    for (let i = 0, endI = studentGroup.length - 1; i < endI; i++) {
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (studentGroup[j].avgMarks < studentGroup[j + 1].avgMarks) {
                let swap = studentGroup[j];
                studentGroup[j] = studentGroup[j + 1];
                studentGroup[j + 1] = swap;
            }
        }
    }  
}

function getAvgMarksStudents (studentGroup) {
    for (let i of studentGroup){          
        let studentsMarks = i['marks'];
        let sum = 0;     

        for (let i = 0; i <= studentsMarks.length - 1; i++){
            sum = sum + studentsMarks[i];
        }

        let avg = sum / (studentsMarks.length);
        i.avgMarks = avg;
    } 
}

function getListOfDebtors(studentGroup) {
    getGroupAverage(groupOfStudents);
    listOfDebtors = [];     

    for (let i = 0; i < studentGroup.length; i++){
        if (studentGroup[i].avgMarks <= groupAverage){
            listOfDebtors.push(studentGroup[i]);
        }
    }  
}

function getGroupAverage(studentGroup) {
    getAvgMarksStudents (groupOfStudents);
    let sumGgoupMarks = 0;

    for (let i = 0; i < studentGroup.length ; i++){
            sumGgoupMarks = sumGgoupMarks + studentGroup[i].avgMarks;
        }

    groupAverage = sumGgoupMarks / (studentGroup.length);
}

function getNewStudents(student) {    
        let newStudents = {
            name: prompt(`Введіть П.І.Б студента!`),           
            marks: [],
            toString: () => `
                П.І.Б.: ${newStudents.name}
                Середній бал: ${newStudents.avgMarks}`           
        }

        if (newStudents.name === '' || newStudents.name === null){
            newStudents.name = 'Анонім';
        }

        do {
            newStudents['marks'].push(Math.ceil(Math.random(13) * 10));
        } while (newStudents['marks'].length < NUMBER_OF_MARKS);

        student.push(newStudents);
}