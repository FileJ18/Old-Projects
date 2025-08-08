const input = document.getElementById('commandInput');
const output = document.getElementById('output');

let mainOS = "none";

function print(text) {
  output.innerHTML += text + '\n';
  window.scrollTo(0, document.body.scrollHeight);
}

function runCommand(cmd) {
  const args = cmd.trim().split(" ");
  const command = args[0];

  switch (command) {
    case 'help':
      print("Available commands:\n" +
        "- power: turns the system off\n" +
        "- boot linux: boot into a Linux OS (Debian, Ubuntu, etc.)\n" +
        "- boot windows 10 / windows 11\n" +
        "- print(word)\n" +
        "- print(multiple words)\n" +
        "- terminal store: opens the fake store\n" +
        "- set linux/windows as main os");
      break;

    case 'power':
      print("System shutting down...");
      input.disabled = true;
      break;

    case 'boot':
      if (args[1] === 'linux') {
        const distro = prompt("Select distro (d=Debian, u=Ubuntu, r=Redhat, a=Arch): ").toLowerCase();
        const distros = { d: 'Debian', u: 'Ubuntu', r: 'Redhat', a: 'Arch' };
        print(distros[distro] ? `Booting into ${distros[distro]}...` : "Invalid choice.");
      } else if (args[1] === 'windows' && (args[2] === '10' || args[2] === '11')) {
        print(`Booting Windows ${args[2]}...`);
      } else {
        print("Unknown boot target.");
      }
      break;

    case 'print':
      const match = cmd.match(/print\((.*)\)/i);
      if (match && match[1]) {
        print(match[1]);
      } else {
        print("Syntax error. Use: print(word or phrase)");
      }
      break;

    case 'terminal':
      if (args[1] === 'store') {
        print("Opening Ternax Terminal Store...\n- Linux utils\n- Retro games\n- Command add-ons");
      } else {
        print("Unknown terminal command.");
      }
      break;

    case 'set':
      if (args[1] === 'linux' || args[1] === 'windows') {
        mainOS = args[1];
        print(`Main OS set to ${mainOS}`);
      } else {
        print("Invalid OS. Use: set linux/windows as main os");
      }
      break;

    default:
      print(`Unknown command: ${cmd}`);
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value;
    print(`Ternax> ${cmd}`);
    runCommand(cmd);
    input.value = '';
  }
});
