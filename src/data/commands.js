const getCommands = () => {
  const commands = {
    '/commands': 'Display a list of all supported commands.',
    '/twitter': 'Display recent tweets of provided account.',
    '/tickers': 'Display info about crypto pairs for provided ticker.',
    '/stocks': 'Display info about stock for provided symbol'
  };

  // format commands to format suitable for telegram bot api
  const formattedCommands = Object.keys(commands)
    .map(key => ({
      'command': key,
      'description': commands[key]
    }));

  const serializedCommands = JSON.stringify(formattedCommands);

  return { commands, formattedCommands, serializedCommands };
};

module.exports = { getCommands };
