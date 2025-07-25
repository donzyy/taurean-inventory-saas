import { InventoryItemDocument, InventoryItemModel } from "../models";
import { Types } from "mongoose";
import { InventoryItem } from "../types"; // Assuming this is where your InventoryItem type is defined

// Create a new inventory item
const createInventoryItem = async (
  itemData: InventoryItem
): Promise<InventoryItemDocument> => {
  try {
    const newItem = new InventoryItemModel(itemData);
    return await newItem.save();
  } catch (error) {
    throw new Error("Error creating inventory item" + (error as Error).message);
  }
};

// Get all inventory items, excluding deleted by default.
// If showDeleted = true, includes deleted items (for admin/staff)
const getAllInventoryItems = async (
  showDeleted = false
): Promise<InventoryItemDocument[]> => {
  try {
    const filter = showDeleted ? {} : { isDeleted: false };
    return await InventoryItemModel.find(filter).populate("associatedFacility");
  } catch (error) {
    throw new Error("Error fetching inventory items");
  }
};

// Get an inventory item by ID, excluding deleted by default.
// If showDeleted = true, includes deleted item (for admin/staff)
const getInventoryItemById = async (
  id: string,
  showDeleted = false
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const filter = showDeleted ? { _id: id } : { _id: id, isDeleted: false };
    return await InventoryItemModel.findOne(filter).populate(
      "associatedFacility"
    );
  } catch (error) {
    throw new Error("Error fetching inventory item");
  }
};

// Update an inventory item by ID, excluding deleted by default.
// If showDeleted = true, allows updating deleted items (for admin)
const updateInventoryItem = async (
  id: string,
  updateData: Partial<InventoryItem>,
  newImages?: any[],
  removeImageIds?: string[],
  replaceAllImages = false,
  showDeleted = false
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const filter = showDeleted ? { _id: id } : { _id: id, isDeleted: false };

    // Handle image operations
    if (newImages?.length || removeImageIds?.length || replaceAllImages) {
      const currentItem = await InventoryItemModel.findOne(filter);
      if (!currentItem) {
        throw new Error("Inventory item not found");
      }

      let updatedImages = [...(currentItem.images || [])];

      // Remove specified images
      if (removeImageIds?.length) {
        updatedImages = updatedImages.filter(
          (img: any) => !removeImageIds.includes(img._id?.toString())
        );
      }

      // Handle new images
      if (newImages?.length) {
        if (replaceAllImages) {
          updatedImages = newImages;
        } else {
          updatedImages = [...updatedImages, ...newImages];
        }
      }

      updateData.images = updatedImages;
    }

    return await InventoryItemModel.findOneAndUpdate(filter, updateData, {
      new: true,
    }).populate("associatedFacility");
  } catch (error: any) {
    throw new Error(`Error updating inventory item: ${error.message}`);
  }
};

// Alternative MongoDB operator approach (more efficient for large arrays)
const updateInventoryItemWithOperators = async (
  id: string,
  updateData: Partial<InventoryItem>,
  newImages?: any[],
  removeImageIds?: string[],
  replaceAllImages = false,
  showDeleted = false
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const filter = showDeleted ? { _id: id } : { _id: id, isDeleted: false };

    // Build update operations
    const updateOperations: any = { ...updateData };

    if (replaceAllImages && newImages?.length) {
      // Replace all images
      updateOperations.images = newImages;
    } else {
      // Handle add/remove operations
      if (removeImageIds?.length) {
        updateOperations.$pull = {
          images: {
            _id: { $in: removeImageIds.map((id) => new Types.ObjectId(id)) },
          },
        };
      }

      if (newImages?.length) {
        updateOperations.$push = {
          images: { $each: newImages },
        };
      }
    }

    return await InventoryItemModel.findOneAndUpdate(filter, updateOperations, {
      new: true,
    }).populate("associatedFacility");
  } catch (error: any) {
    throw new Error(`Error updating inventory item: ${error.message}`);
  }
};

// Soft delete an inventory item by ID (sets isDeleted = true)
const deleteInventoryItem = async (
  id: string
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    return await InventoryItemModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error deleting inventory item");
  }
};

// Restore a soft-deleted inventory item by ID (sets isDeleted = false)
const restoreInventoryItem = async (
  id: string
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    return await InventoryItemModel.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error restoring inventory item");
  }
};

// Get inventory items by status, excluding deleted by default
// Include deleted if showDeleted = true
const getInventoryItemsByStatus = async (
  status: string,
  showDeleted = false
): Promise<InventoryItemDocument[]> => {
  try {
    const filter = showDeleted ? { status } : { status, isDeleted: false };
    return await InventoryItemModel.find(filter).populate("associatedFacility");
  } catch (error) {
    throw new Error("Error fetching inventory items by status");
  }
};

// Add a maintenance schedule entry, exclude deleted by default
// Allow on deleted if showDeleted = true
const addMaintenanceSchedule = async (
  id: string,
  scheduleData: any,
  showDeleted = false
): Promise<InventoryItemDocument | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const filter = showDeleted ? { _id: id } : { _id: id, isDeleted: false };
    return await InventoryItemModel.findOneAndUpdate(
      filter,
      { $push: { maintenanceSchedule: scheduleData } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error adding maintenance schedule");
  }
};

// Get low stock inventory items (quantity < 5), exclude deleted by default
const getLowStockItems = async (
  showDeleted = false
): Promise<InventoryItemDocument[]> => {
  try {
    const filter: any = showDeleted
      ? { quantity: { $lt: 5 } }
      : { quantity: { $lt: 5 }, isDeleted: false };
    return await InventoryItemModel.find(filter).populate("associatedFacility");
  } catch (error: any) {
    throw new Error(error.message || "Error fetching low stock items");
  }
};

export {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  restoreInventoryItem,
  getInventoryItemsByStatus,
  addMaintenanceSchedule,
  getLowStockItems,
  updateInventoryItemWithOperators,
};
