import asyncHandler from 'express-async-handler';  
import transactionModel from '../Models/TransactionModel.js';

const transactionController = {
  // add Transaction
  create: asyncHandler(async (req, res) => { 
    const { type, category, amount, date, description } = req.body;
     if(!amount || !type || !date){
        throw new Error("Amount, Type and Date are Required for Transaction")
     } 
     const Transaction = await transactionModel.create({
        user: req.userById,
        type,
        category,
        amount,
        description,
     });

     res.status(201).json(Transaction);
  }),
  
  // List Transaction
    transactionLists: asyncHandler(async(req,res)=>{
        // const getTransaction = await transactionModel.find({ user: req.userById });
        // res.json(getTransaction);
        
        const { startDate, endDate, type, category } = req.query;
        // console.log(req.query);

        let filters = { user: req.userById};
        
        if(startDate){
            filters.date = { ...filters.date, $gte: new Date(startDate)};
        }
        if(endDate){
            filters.date = { ...filters.date, $lte: new Date(endDate)};
        }
        if(type){
            filters.type = type;
        }
        if(category){
            if(category === "All"){

            }
            else if(category === "Uncategorized"){
                filters.category = "Uncategorized"
            }else{
                filters.category = category;
            }
        }

        const Transaction = await transactionModel.find(filters).sort({ date : -1 });
        res.json(Transaction);
    }), 

  // Update Transaction
  update: asyncHandler(async(req,res) => {
       const updateTransaction = await transactionModel.findById(req.params.id);
       if(updateTransaction && updateTransaction.user.toString() === req.userById.toString()){
            updateTransaction.type = req.body.type || updateTransaction.type ,
            updateTransaction.category = req.body.category || updateTransaction.category , 
            updateTransaction.amount = req.body.amount || updateTransaction.amount , 
            updateTransaction.date = req.body.date || updateTransaction.date ,
            updateTransaction.description = req.body.description || updateTransaction.description
            
            const finalTransaction = await updateTransaction.save();

            res.json(finalTransaction);
       }
}),

  // Delete Transaction
  delete: asyncHandler(async(req,res) => { 
    const deleteTransaction = await transactionModel.findById(req.params.id);
    if(deleteTransaction && deleteTransaction.user.toString() === req.userById.toString()){
          await transactionModel.findByIdAndDelete(req.params.id);
          res.json({ message: "Transaction Deleted Successfully" })
    }
}), 
};

export default transactionController; 