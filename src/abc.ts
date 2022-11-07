const branches: Fig.Generator = {
  script: "git branch --no-color",
  postProcess: (output) => {
    if (output.startsWith("fatal:")) {
      return [];
    }
    return output.split("\n").map((branch) => {
      return { name: branch.replace("*", "").trim(), description: "branch"};
    });
  },
};

const completionSpec: Fig.Spec = {
  name: "abc",
  description: "abc is a prototype for the git command and its completion spec",
  subcommands: [
    {
      name: "checkout",
      description: "Switch to a Git branch in the current working directory",
      args: {
          name: "branch",
          description: "the branch you want to checkout",
          isOptional: true,
          generators: branches,
      },
      options: [
        {
          name: ["-b"],
          description: "create a new branch before checking it out"
        }
      ],
    },
    {
      name: "commit",
      description: "commit changes from the staging area",
      options: [
        {
          name: ["-m"],
          description: "commit message (inline)",
          args:
          {
            name: "message",
            description: "commit message (inline)",
            isOptional: false,
          }
        }
      ]
    },
  ],
  options: [{
    name: ["--help", "-h"],
    description: "Show help for abc",
  }],
  // Only uncomment if abc takes an argument
  // args: {}
};



export default completionSpec;