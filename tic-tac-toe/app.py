from models.Game import Game

game = Game(3)
for i in range(2):
    user_input = input().split()
    game.set_user(user_input[0], user_input[1])

game.play_game()
