defmodule BackendWeb.HelloController do
  use BackendWeb, :controller

  def message(conn, %{"data" => data}) do
    render(conn, "hello.html", data: data)
  end
end
