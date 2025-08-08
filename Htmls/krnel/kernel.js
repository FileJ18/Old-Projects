function runLua() {
  const luaCode = document.getElementById("lua-code").value;
  const output = document.getElementById("output");

  try {
    fengari.load(luaCode)();
    output.textContent = "Lua ran successfully!";
  } catch (err) {
    output.textContent = "Lua Error:\n" + err.message;
  }
}
