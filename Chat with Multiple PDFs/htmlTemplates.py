css = '''
<style>
.chat-message {
    padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; display: flex
}
.chat-message.user {
    background-color: #2b313e
}
.chat-message.bot {
    background-color: #475063
}
.chat-message .avatar {
  width: 20%;
}
.chat-message .avatar img {
  max-width: 78px;
  max-height: 78px;
  border-radius: 50%;
  object-fit: cover;
}
.chat-message .message {
  width: 80%;
  padding: 0 1.5rem;
  color: #fff;
}
'''

bot_template = '''
<div class="chat-message bot">
    <div class="avatar">
        <img src="https://i0.wp.com/wemadethislife.com/wp-content/uploads/2022/12/Screenshot-2022-04-26-at-2.32.19-PM.png?w=720&ssl=1" style="max-height: 78px; max-width: 78px; border-radius: 50%; object-fit: cover;">
    </div>
    <div class="message">{{MSG}}</div>
</div>
'''

user_template = '''
<div class="chat-message user">
    <div class="avatar">
        <img src="https://play-lh.googleusercontent.com/830wVRGpgr6whP_zJ_1kh7QpuQvCvZ7x-_qJDjYGC2JAp46rj-xOKKzBqyItO4t32WoQ">
    </div>    
    <div class="message">{{MSG}}</div>
</div>
'''