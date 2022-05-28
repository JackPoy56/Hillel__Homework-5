function main() {
    
    const groupOfStudents = getGroupOfStudents();
    
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
                    getBestStudent(groupOfStudents, getAvgMarksStudents(groupOfStudents));                                        
                    break;

                case 2:
                    getGradeList(groupOfStudents, getAvgMarksStudents(groupOfStudents));
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
                    getListOfDebtors(groupOfStudents, getAvgMarksStudents(groupOfStudents));                    
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

main();