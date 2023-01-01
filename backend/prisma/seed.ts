import { db } from "../src/config/db.server";

async function main() {
  seedIncomeCategory();
  seedExpenseCategory();
  seedSavingModels();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

async function seedIncomeCategory() {
  try {
    return await db.incomeCategory.createMany({
      data: [
        {
          name: "Salary",
        },
        {
          name: "Investments",
        },
        {
          name: "Savings",
        },
        {
          name: " Gifts",
        },
        {
          name: " Other",
        },
      ],
    });
  } catch (e) {
    console.log(" error in seedIncomeCategory");
  }
}

async function seedExpenseCategory() {
  try {
    return await db.expenseCategory.createMany({
      data: [
        {
          name: "Food",
        },
        {
          name: "Transportation",
        },
        {
          name: "Housing",
        },
        {
          name: "Utilities",
        },
        {
          name: "Bills",
        },
      ],
    });
  } catch (e) {
    console.log(" error in seedExpenseCategory");
  }
}

async function seedSavingModels() {
  try {
    return await db.savingModel.createMany({
      data: [
        {
          name: "Classic ",
          percentage: 10,
        },
        {
          name: "Aggressive",
          percentage: 50,
        },
        {
          name: "Conservative",
          percentage: 5,
        },
        {
          name: "None",
          percentage: 0,
        },
      ],
    });
  } catch (e) {
    console.error(" error in seedSavingModels");
  }
}
