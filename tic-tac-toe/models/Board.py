class Board:
    __default_symbol = '-'

    def __init__(self, size):
        self.__size = size
        self.__symbols = []
        self.__board = [
            [self.__default_symbol for i in range(size)] for j in range(size)]

    def set_symbol(self, symbol):
        self.__symbols.append(symbol)

    def __check_draw(self):
        for row in self.__board:
            for col in row:
                if col == self.__default_symbol:
                    return False
        return True

    def __check_horizontal_win(self, symbol):
        for rows in self.__board:
            win_flag = True
            for col in rows:
                if col != symbol:
                    win_flag = False
                    break
            if win_flag:
                return win_flag
        return False

    def __check_vertical_win(self, symbol):
        for j in range(self.__size):
            win_flag = True
            for i in range(self.__size):
                if self.__board[i][j] != symbol:
                    win_flag = False
                    break
            if win_flag:
                return win_flag
        return False

    def __check_diagonal_win(self, symbol):
        win_flag = True
        win_flag2 = True
        for i in range(self.__size):
            if self.__board[i][i] != symbol:
                win_flag = False
            if self.__board[self.__size-i-1][i] != symbol:
                win_flag2 = False
        if win_flag or win_flag2:
            return True
        return False

    def print_board(self):
        for b in self.__board:
            for c in b:
                print(c, end=" ")
            print("")

    def get_board_size(self):
        return self.__size

    def get_board_symbols(self):
        return self.__symbols

    def check_for_win(self):
        for symbol in self.__symbols:
            if self.__check_horizontal_win(symbol) or self.__check_vertical_win(symbol) or self.__check_diagonal_win(symbol):
                return symbol
        if self.__check_draw():
            return 'Draw'
        return None

    def place_piece(self, i, j, symbol):
        i = i-1
        j = j-1
        if (i < 0 or i >= self.__size) or (j < 0 or j >= self.__size):
            raise Exception('Invalid Positions')
        elif self.__board[i][j] != self.__default_symbol:
            raise Exception('Position Prefilled')
        else:
            self.__board[i][j] = symbol
