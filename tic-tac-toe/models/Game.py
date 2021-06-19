from models.Board import Board


class Game:

    __user_symbol = {}
    __users = []
    __num_user = 0
    __is_game_active = False

    def __init__(self, size):
        self.__board = Board(size)

    def set_user(self, symbol, user_name):
        self.__user_symbol[user_name] = symbol
        self.__board.set_symbol(symbol)
        self.__num_user += 1
        self.__users.append(user_name)

    def play_game(self):
        self.__board.print_board()
        total_users = len(self.__users)
        player_turn = 0
        self.__is_game_active = True
        while self.__is_game_active:
            player_turn = player_turn % total_users
            while True:
                try:
                    user_input = input()
                    if user_input == 'exit':
                        self.__is_game_active = False
                        break
                    positions = [int(i) for i in user_input.split()]
                    self.__board.place_piece(
                        positions[0], positions[1], self.__user_symbol.get(self.__users[player_turn]))
                    break
                except:
                    print('Invalid Move')
            self.__board.print_board()
            game_status = self.__board.check_for_win()
            if game_status is None:
                player_turn += 1
                continue
            elif game_status == 'Draw':
                print('Game Over')
                break
            else:
                print('{} has won the game'.format(self.__users[player_turn]))
                break
