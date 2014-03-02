get '/' do
	@main = true

	erb :index
end

get '/about' do

	erb :about
end

get '/speaking' do

	erb :speaking
end

get '/consulting' do

	erb :consulting
end

get '/training' do

	erb :training
end

get '/why-hire' do

	erb :why_hire
end

get '/guarantee' do

	erb :guarantee
end

get '/video' do

	erb :video
end

get '/handouts' do

	erb :handouts
end

get '/testimonials' do

	erb :testimonials
end

get '/contact' do

	erb :contact
end

get '/signup' do

	erb :signup
end

get '/salesshot' do

	erb :salesshot
end

get '/sales-checklist' do

	erb :sales_checklist
end

get '/tournament' do

	erb :tournament
end

not_found do
	
	erb :fourofour
end
