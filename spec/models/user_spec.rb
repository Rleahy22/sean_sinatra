require 'spec_helper'

describe User do
  before(:each) do 
    @user = User.create!(email: "ryan@me.com",
                         password: "Password1",
                         password_confirmation: "Password1")
  end

  after(:each) do
    User.destroy(@user.id)
  end

  subject { @user }

  it { should respond_to(:email) }
  it { should respond_to(:password_digest) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to(:remember_token) }

  it { should be_valid }

  describe "when email is not present" do
    before { @user.email = '' }
    it { should_not be_valid }
  end

  describe "when email is not in correct format" do
    it "should be invalid" do
      addresses = %w[useratgmaildotcom me@mecom @gmail.com user]
      addresses.each do |invalid_address|
        @user.email = invalid_address
        expect(@user).not_to be_valid
      end
    end
  end

  describe "when email is already taken" do
    before do
      user_with_same_email = @user.dup
      user_with_same_email.email = @user.email.upcase
      user_with_same_email.should_not be_valid
    end
  end

  describe "when password is too short" do
    before { @user.password = @user.password_confirmation =  '*' * 5 }
    it { should_not be_valid }
  end
end