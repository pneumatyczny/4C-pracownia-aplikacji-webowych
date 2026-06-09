from typing import List, Tuple


def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, "r", encoding="utf-8") as f:
        lines = f.read().strip().split("\n")

    n = int(lines[0])
    adj_list: List[List[int]] = []

    for i in range(1, len(lines)):
        if lines[i].strip():
            row = list(map(int, lines[i].split()))
            adj_list.append(row)

    return adj_list, n


def write_neighbours_list(adj_list: List[List[int]]) -> None:
    for i, neighbours in enumerate(adj_list):
        formatted = ", ".join(map(str, neighbours))
        print(f"Sąsiadami wierzchołka {i} są: {formatted}")


def list_to_matrix(adj_list: List[List[int]], n: int) -> List[List[int]]:
    matrix = [[0] * n for _ in range(n)]

    for i, neighbours in enumerate(adj_list):
        for j in neighbours:
            matrix[i][j] = 1

    return matrix


def write_matrix(matrix: List[List[int]]) -> None:
    for row in matrix:
        print(" ".join(map(str, row)))


def main():
    adj_list, n = read_graph("graph.txt")

    print("Lista sąsiedztwa:")
    write_neighbours_list(adj_list)

    print("\nMacierz sąsiedztwa:")
    matrix = list_to_matrix(adj_list, n)
    write_matrix(matrix)


if __name__ == "__main__":
    main()
