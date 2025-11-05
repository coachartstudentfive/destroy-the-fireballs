namespace SpriteKind {
    export const border = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ball_count += 1
    if (ball_count > 3) {
        game.splash("CAN'T SPAWN MORE BALLS")
    } else {
        ball_vy = 20
        ball_vx = 20
        ball = sprites.create(assets.image`fireball`, SpriteKind.Projectile)
        ball.top = 1
        ball.setStayInScreen(true)
        ball.setBounceOnWall(true)
        ball.setVelocity(ball_vx, ball_vy)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.border, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    ball_count = 0
    if (info.score() > high_score) {
        high_score = info.score()
    }
    info.setScore(0)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    ball.y += randint(-140, -220)
    info.changeScoreBy(1)
    if (info.score() % 5 == 0) {
        ball_vx += 5
        ball_vy += 5
        ball.setVelocity(ball_vx, ball_vy)
    }
})
info.onLifeZero(function () {
    game.splash("Your high score was", high_score)
    game.setGameOverMessage(false, "GAME OVER!")
    game.gameOver(false)
})
let high_score = 0
let ball: Sprite = null
let ball_vx = 0
let ball_vy = 0
let ball_count = 0
ball_count = 0
info.setLife(3)
scene.setBackgroundImage(assets.image`BACKGROUND`)
info.setScore(0)
let bottom = sprites.create(assets.image`border`, SpriteKind.border)
bottom.setPosition(80, 118)
let paddle = sprites.create(assets.image`paddle`, SpriteKind.Player)
paddle.setPosition(80, 110)
controller.moveSprite(paddle, 100, 0)
game.splash("This is Paddle!", "Press A to launch a ball. Press B to destroy all balls.")
