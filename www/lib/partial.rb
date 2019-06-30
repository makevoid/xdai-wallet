module Partial
  def partial(partial_name)
    haml   = File.read "#{PATH}/#{partial_name}.haml"
    engine = Haml::Engine.new haml
    haml_concat engine.render
  end
end
