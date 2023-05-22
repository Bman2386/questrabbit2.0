class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password_digest, :session_token, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true
 

    attr_reader :password

    before_validation :ensure_session_token

    has_many :quests,
        foreign_key: :creator_id 

    has_many :reviews,
        foreign_key: :user_id


    def self.find_by_credentials(username, password)
        user = User.find_by( username: username)
        return nil if user.nil? 
        user&.authenticate(password) ? user : nil
    end

    def reset_session_token!
      self.session_token = generate_unique_session_token
      save!
     return session_token
    end

  private

  def generate_unique_session_token
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.exists?(session_token: session_token)
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
