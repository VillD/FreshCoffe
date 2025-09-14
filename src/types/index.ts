import { z } from 'astro:content'

const CategorySchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	acf: z.object({
		icon: z.string(),
	}),
})

export const CategoriesSchema = z.array(CategorySchema)
export type Category = z.infer<typeof CategorySchema>

const ImageSchema = z.object({
	url: z.string().url(),
	width: z.number(),
	height: z.number(),
})

const FeaturedImageSchema = z.object({
	thumbnail: ImageSchema,
	medium: ImageSchema,
	medium_large: ImageSchema,
	large: ImageSchema,
	full: ImageSchema,
})

const VariablePairSchema = z.object({
  price: z.coerce.number(),
  size: z.string(),
})

export const VariablePriceSchema = z.object({
  variable_price: z.literal(true),
  small: VariablePairSchema,
  medium: VariablePairSchema,
  large: VariablePairSchema,
})

const FixedPriceSchema = z.object({
    variable_price: z.literal(false),
  price: z.coerce.number(),
})

export const ProductPriceSchema = z.discriminatedUnion(
  'variable_price',
  [VariablePriceSchema, FixedPriceSchema]
)

const ProductSchema = z.object({
	id: z.number(),
  slug: z.string(),
	title: z.object({
		rendered: z.string(),
	}),
  featured_media: z.number(),
	featured_images: FeaturedImageSchema,
  acf: ProductPriceSchema,
  freshcoffee_category: z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
  })
})

export const ProductsSchema = z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>

const ProductWithVariablePriceSchema = ProductSchema.extend({
  acf: VariablePriceSchema
}) 
export type ProductWithVariablePrice = z.infer<typeof ProductWithVariablePriceSchema>

/** Order - Client */
const SelectedProductSechema = z.object({
  id:z.number(),
  name: z.string().min(1, {message: 'El nombre es obligatorio'}),
  price: z.number().min(1, {message: 'El precio no es valido'}),
  size:z.optional(z.string().min(1, {message: 'El tamaño no es valido'}))
})

export type SelectedProduct = z.infer<typeof SelectedProductSechema>

export const OrderItemSchema = SelectedProductSechema.extend({
	quantity: z.number(),
	subtotal: z.number(),
	key: z.optional(z.string())
})

export type OrderItem = z.infer<typeof OrderItemSchema>
export const OrderContentSchema = z.object({
	id:z.number(),
	title: z.string(),
	content: z.string(),
	status: z.string(),
	name: z.string(),
	total: z.number(),
})

export type OrderContent = z.infer<typeof OrderContentSchema>