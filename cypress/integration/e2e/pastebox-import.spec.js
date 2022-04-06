const exampleInventory = `Name,Quantity,Color,Card Text,Scryfall ID,Edition,Edition code,Collector's number,Mana Value,CMC,Location
"Renounce the Guilds","1","White","""Each player sacrifices a multicolored permanent.""","bc9acc14-24e0-4c03-a09a-2afee351f2cc","Dragon's Maze","DGM","5","{1}{W}","2","My Binder"
"Grab the Reins","1","Red","""Choose one —
• Until end of turn, you gain control of target creature and it gains haste.
• Sacrifice a creature. Grab the Reins deals damage equal to that creature's power to any target.
Entwine {2}{R} (Choose both if you pay the entwine cost.)""","d74d181c-6783-4472-a3b9-2f6780e2b89b","Commander 2016","C16","126","{3}{R}","4","My Other Binder"`;

describe("Test Pastebox Import", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.scryfall.com/cards/bc9acc14-24e0-4c03-a09a-2afee351f2cc?format=json",
      { fixture: "renounce-bc9acc14-24e0-4c03-a09a-2afee351f2cc.json" }
    ).as("Renounce-scryfallid");
    cy.intercept(
      "GET",
      "https://api.scryfall.com/cards/d74d181c-6783-4472-a3b9-2f6780e2b89b?format=json",
      { fixture: "grabthereins-d74d181c-6783-4472-a3b9-2f6780e2b89b.json" }
    ).as("Grabthereins-scryfallid");
    cy.visit("/");
  });
  it("Paste and Import", function () {
    cy.get("[data-cy=paste-box-textarea]").clear();
    cy.get("[data-cy=paste-box-textarea]").type(exampleInventory, {
      delay: 0,
      parseSpecialCharSequences: false,
    });
    cy.get("[data-cy=import]").click();
    // ? 1st item:
    cy.get("[data-cy=inventory-table]")
      .contains("td", "Renounce the Guilds")
      .click();
    cy.get("[data-cy=item-details-name]")
      .contains("Renounce the Guilds")
      .should("to.exist");

    // ? 2nd item:
    cy.get("[data-cy=inventory-table]")
      .contains("td", "Grab the Reins")
      .click();
    cy.get("[data-cy=item-details-name]")
      .contains("Grab the Reins")
      .should("to.exist");
  });
});
