const exampleInventory = `Name,Quantity,Color,Card Text,Scryfall ID,Edition,Edition code,Collector's number,Mana Value,CMC,Location
"Renounce the Guilds","1","White","""Each player sacrifices a multicolored permanent.""","bc9acc14-24e0-4c03-a09a-2afee351f2cc","Dragon's Maze","DGM","5","{1}{W}","2","My Binder"
"Grab the Reins","1","Red","""Choose one —
• Until end of turn, you gain control of target creature and it gains haste.
• Sacrifice a creature. Grab the Reins deals damage equal to that creature's power to any target.
Entwine {2}{R} (Choose both if you pay the entwine cost.)""","d74d181c-6783-4472-a3b9-2f6780e2b89b","Commander 2016","C16","126","{3}{R}","4","My Other Binder"`;

describe("Test Pastebox Import", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Paste and Import", function () {
    // cy.get("[data-cy=paste-box-textarea]")
    //   .invoke("val", exampleInventory)
    //   .trigger("blur");
    cy.get("[data-cy=import]").click();
  });
});
