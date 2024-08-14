import asyncHandler from 'express-async-handler'; 
import categoryModel from '../Models/CategoryModel.js';
import transactionModel from '../Models/TransactionModel.js';

const categoryController = {
  // add Expenses
  create: asyncHandler(async (req, res) => { 
    const { name,type } = req.body;
     if(!name || !type){
        throw new Error("Name and Type are Required for Category")
     }

     const Normalize = name.toLowerCase();
     const validTypes = ["income","expense"];
     if(!validTypes.includes(type.toLowerCase())){
        throw new Error("Invalid Category Type"+ type);
     } 

     const categoryExists = await categoryModel.findOne({
        name: Normalize,
        user: req.userById
     });
     if(categoryExists){
        throw new Error(`Category ${categoryExists.name} Already exists in the database`);
     }

     const newCategory = await categoryModel.create({
        name: Normalize,
        user: req.userById,
        type,
     })

     res.status(201).json(newCategory);
  }),

  // List Expenses
    lists: asyncHandler(async(req,res)=>{
         const getCategories = await categoryModel.find({ user: req.userById });
         res.status(200).json(getCategories); 
    }), 
 
// Update Expenses
update: asyncHandler(async (req, res) => {
   const { id } = req.params; // Extract the category ID from request parameters
   const { type, name } = req.body;
   const Normalize = name.toLowerCase();
    
   const category = await categoryModel.findById(id);
     
   if (!category) {
       throw new Error("Category Not Found");
   }

   if (category.user.toString() !== req.userById.toString()) {
       throw new Error("Unauthorized Access: This category does not belong to the current user");
   }
  
   const pastName = category.name;
   category.name = Normalize;
   category.type = type;
 
   const updatedCategory = await category.save();
 
   if (pastName !== updatedCategory.name) {
       await transactionModel.updateMany(
           {
               user: req.userById,
               category: pastName,
           },
           {
               $set: { category: updatedCategory.name }
           }
       );
   }
 
   res.json(updatedCategory);
}),


  // Delete Expenses
  delete: asyncHandler(async(req,res) => { 
      const category = await categoryModel.findById(req.params.id);

      if(category && category.user.toString() === req.userById.toString()){
         const defaultCategory = "Uncategorized";
         await transactionModel.updateMany({ 
            user: req.userById,
            category: category._id
         },
            { $set: { category: defaultCategory}}
         );

         await categoryModel.findByIdAndDelete(req.params.id);

         res.json({ message: "Category Removed and Also Transaction Updated Successfully"});
      }else{
         res.json({ message: "Category or User not Fount" });
      }
}), 
};

export default categoryController; 