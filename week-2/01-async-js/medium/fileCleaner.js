const fs = require("fs");

const cleanFile = (filename) => {
  fs.readFile(filename, "utf-8", (err, data) => {
    console.log("Read file successfully!");
    const content = data.split(" ");
    let final_content = [];
    content.forEach((string) => {
      if (string) {
        final_content.push(string);
      }
    });

    let final_str = "";
    final_content.forEach((string) => {
      final_str += string + " ";
    });
    fs.writeFile(filename, final_str, () => {
      console.log("Wrote back the cleaned data to file.");
    });
  });
};

cleanFile("testFile.txt");
