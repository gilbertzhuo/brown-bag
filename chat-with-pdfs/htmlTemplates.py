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
        <img src="https://images.glints.com/unsafe/360x0/glints-dashboard.s3.amazonaws.com/company-logo/b785d98c3e5be1370cb8e66e73effcee.png" style="max-height: 78px; max-width: 78px; border-radius: 50%; object-fit: cover;">
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