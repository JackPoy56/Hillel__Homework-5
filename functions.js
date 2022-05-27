function main() {
    addMarks(groupOfStudents);

    loop: do {
        const operation = +prompt(`Оберіть операцію:
        1. Отримати самого успішного студента. 
        2. Відсортувати студентів за успішністю.
        3. Розрахувати середню оцінку для кожного студента та роздрукувати.
        4. Отримати студентів на відрахування.
        5. Додати новенького в групу.
        6. Долучити незрозуміло кого.`)

        if (operation > 0 && operation < 7){
            switch (operation) {
                case 1:
                    getBestStudent(groupOfStudents);                                        
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
                    break;
                    
                case 5:
                    getNewStudents(groupOfStudents);
                    break;

                case 6:
                    addRandomStudent(groupOfStudents);
                    break;
            } 
        }
    } while (confirm(`Повторити операції?`));
}

function getGroupOfStudents() {
    let numberOfStudents; 
    
    do {
        numberOfStudents = +prompt('Яка кількість студентів в групі?', 'Кількість в числах');
    } while (numberOfStudents != numberOfStudents || numberOfStudents === 0);

    const groupOfStudents = [];

    for (let i = 0; numberOfStudents > 0 && i < numberOfStudents; i++) { 
        let students = {
            name: prompt(`Введіть П.І.Б ${i + 1} студента!`),           
            marks: undefined,
            toString: () => `
                П.І.Б.: ${students.name}
                Середній бал: ${students.avgMarks}`    
        }

        if (students.name === '' || students.name === null){
            students.name = 'Анонім';
        }

        groupOfStudents.push(students);
    }    
    
    return groupOfStudents;
}

function addMarks(studentGroup) {
    const NUMBER_OF_MARKS = 5;

    for (let i of studentGroup){      
        const howToAddMarks = confirm(`Бажаєте ввести оцінки студенту ${i.name} самостійно?`);
        
        if (howToAddMarks === true){
            let marks = prompt('Введіть оцінки студента через кому!');
            
            if (marks === null){
                marks = '0';
            }

            marks = marks.split(',', NUMBER_OF_MARKS).map(Number);

            for ( let i = 0; i < marks.length; i++){
                if (marks[i] > 12){
                    marks[i] = 12;
                } else if (marks[i] < 0 || isNaN(marks[i])){
                marks[i] = 0;
                }    
            }

            i['marks'] = marks;

        } else {
            i['marks'] = [];
            do {
                i['marks'].push(Math.ceil(Math.random(13) * 10));
            } while (i['marks'].length < NUMBER_OF_MARKS);
        }
    }   
}

function getBestStudent(studentGroup) {
    getAvgMarksStudents(groupOfStudents);
    let bestStudent = studentGroup[0];

    for (let i = 1; i < studentGroup.length; i++){
        if (bestStudent.avgMarks < studentGroup[i].avgMarks){
            bestStudent = studentGroup[i];
        }        
    } 

    alert(`Кращій учень: ${bestStudent.name} середній бал - ${bestStudent.avgMarks}.`);   
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
    getAvgMarksStudents (groupOfStudents);

    let listOfDebtors = [];  
    let sumGgoupMarks = 0;

    for (let i = 0; i < studentGroup.length ; i++){
            sumGgoupMarks = sumGgoupMarks + studentGroup[i].avgMarks;
        }

    let groupAverage = sumGgoupMarks / (studentGroup.length);

    for (let i = 0; i < studentGroup.length; i++){
        if (studentGroup[i].avgMarks <= groupAverage){
            listOfDebtors.push(studentGroup[i]);
        }
    }  

    alert(listOfDebtors);
}

function getNewStudents(student) {    
        let newStudents = {
            name: prompt(`Введіть П.І.Б студента!`),           
            marks: undefined,
            toString: () => `
                П.І.Б.: ${newStudents.name}
                Середній бал: ${newStudents.avgMarks}`           
        }

        if (newStudents.name === '' || newStudents.name === null){
            newStudents.name = 'Анонім';
        }

        const NUMBER_OF_MARKS = 5;

        const howToAddMarks = confirm(`Бажаєте ввести оцінки студенту самостійно?`);
        
        if (howToAddMarks === true){
            let marks = prompt('Введіть оцінки студента через кому!');
            
            if (marks === null){
                marks = '0';
            }

            marks = marks.split(',', NUMBER_OF_MARKS).map(Number);

            for ( let i = 0; i < marks.length; i++){
                if (marks[i] > 12){
                    marks[i] = 12;
                } else if (marks[i] < 0 || isNaN(marks[i])){
                marks[i] = 0;
                }    
            }

            newStudents['marks'] = marks;
        } else {
            newStudents['marks'] = [];
            do {
                newStudents['marks'].push(Math.ceil(Math.random(13) * 10));
            } while (newStudents['marks'].length < NUMBER_OF_MARKS);
        }     

        student.push(newStudents);
}

function addRandomStudent(groupOfStudents) {
    let randomStudent = studentsMock.getStudent();

    randomStudent.toString = () => `
                П.І.Б.: ${randomStudent.name}
                Середній бал: ${randomStudent.avgMarks}`; ///// добавил два таба чтоб в итоговом списке все результаты были на одном уровне

    groupOfStudents.push(randomStudent);    
}