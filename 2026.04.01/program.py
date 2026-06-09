from dataclasses import dataclass
from typing import List


@dataclass
class Student:
    id: int
    first_name: str
    last_name: str
    age: int
    courses: List[str]


def load_students(file_path: str):
    students = {}

    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            id_, first, last, age = line.strip().split(",")

            students[id_] = Student(
                id=int(id_), first_name=first, last_name=last, age=int(age), courses=[]
            )

    return students


def load_courses(file_path: str, students: dict):
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            student_id, course_name = line.strip().split(",")

            if student_id in students:
                students[student_id].courses.append(course_name)


def print_students(students: dict):
    for student in students.values():
        print(f"{student.first_name} {student.last_name}, {student.age} lat")
        print("Kursy:")

        for course in student.courses:
            print(f"- {course}")

        print()


def save_student_files(students: dict):
    for student in students.values():
        filename = f"{student.first_name}_{student.last_name}.txt"

        with open(filename, "w", encoding="utf-8") as f:
            f.write("Kursy:\n")

            for course in student.courses:
                f.write(f"- {course}\n")


def main():
    students = load_students("students.txt")
    load_courses("courses.txt", students)

    print_students(students)
    save_student_files(students)


if __name__ == "__main__":
    main()
