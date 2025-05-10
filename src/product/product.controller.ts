import { ProductService } from './product.service';
import { Controller, Res, Get, Query, Param } from '@nestjs/common';
import { Response } from 'express';
import {
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiBadRequestResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiQuery,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('/api/v1/products/')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('slider')
  getCardSliderImgs(@Res({ passthrough: true }) res: Response): object {
    return this.productService.getCardSliderImgs(res);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Home page products.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Home page products.',
        countedFilteredProducts: 16,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 2,
        inStockHighestRatedProducts: [
          {
            _id: '64343450f12b4bff9ed4f33a',
            name: 'GURUNVANI CASUAL HOODIE',
            price: 37.20,
            img: 'https://m.media-amazon.com/images/I/71WAHW1dDPL._AC_SX679_.jpg',
            outOfStock: false,
          },
          `{ ............ }`,
        ],
        outOfStockHighestRatedProducts: {
          _id: '64341f00c44bd43e6c192eb8',
          name: 'YELLOW CROWN T-Shirt',
          price: 19.99,
          img: 'https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C61EgCJXa5xL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png',
          outOfStock: true,
        },
        bestSellerProducts: [
          {
            _id: '643435d1dd430a8163e979cd',
            name: 'GURUNVANI Patchwork Sweater Mens Colorblock Jumper',
            price: 34.99,
            img: 'https://m.media-amazon.com/images/I/71HjHXQ-sZL._AC_SX679_.jpg',
            outOfStock: false,
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('home')
  getHomePageProducts(@Res({ passthrough: true }) res: Response): object {
    return this.productService.getHomePageProducts(res);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Product search results.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'All products.',
        countedFilteredProducts: 30,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 3,
        products: [
          {
            _id: '643435e9dd430a8163e979d0',
            name: 'Champion Men\'s Midweight T-shirt Hoodie',
            price: 27.97,
            outOfStock: false,
            img: 'https://m.media-amazon.com/images/I/71Dpa65k8tL._AC_SX679_.jpg',
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiQuery({
    name: 'outOfStock',
    type: Boolean,
    example: false,
    required: false,
  })
  @ApiQuery({ name: 'maxPrice', type: Number, example: 300, required: false })
  @ApiQuery({ name: 'minPrice', type: Number, example: 50, required: false })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: true })
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('all')
  getAllProducts(
    @Res({ passthrough: true }) res: Response,
    @Query()
    query: {
      page: number;
      outOfStock: boolean;
      minPrice: number;
      maxPrice: number;
    },
  ): object {
    return this.productService.getAllProducts(res, query);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Home page products.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'All products.',
        countedFilteredProducts: 30,
        productsPerPage: 10,
        currentPage: 2,
        maxPages: 3,
        products: [
          {
            _id: '643435e9dd430a8163e979d0',
            name: 'Champion Men\'s Midweight T-shirt Hoodie',
            img: 'https://m.media-amazon.com/images/I/71BuTSFd3NL._AC_SX679_.jpg',
          },
          `{ ............ }`,
        ],
      },
    },
  })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: true })
  @ApiQuery({
    name: 'productName',
    type: String,
    example: 'WINDBREAKER',
    required: true,
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('search')
  searchProduct(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { productName: string; page: string },
  ): object {
    return this.productService.searchProduct(res, query);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Product Page info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Product data.',
        products: {
          _id: '6434128729b016ab84333d2d',
          name: 'GAP Men\'s Full Zip Fleece Logo Hoodie',
          price: 59.99,
          imgs: [
            'https://m.media-amazon.com/images/I/91uQsD2K2vL._AC_SX679_.jpg',
            'https://m.media-amazon.com/images/I/91AUmJk0F9L._AC_SY879_.jpg',
          ],
          colors: ['red', 'green', 'blue'],
          description:
            "The GAP Men's Full Zip Fleece Logo Hoodie is a comfortable and stylish clothing item that is perfect for casual wear during the colder seasons.",
          sizes: [
            'Small',
            'Medium',
            'Large',
            'X-Large',
            'XX-Large',
            'XXX-Large',
          ],
          productInfo: '100% cotton',
          outOfStock: true,
          totalRates: 3.6,
        },
      },
    },
  })
  @ApiParam({
    name: 'productId',
    type: String,
    example: '64149035cf732fb7ea6ed435',
    required: true,
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('singleProduct/:productId')
  getProductPage(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
  ): object {
    return this.productService.getProductInfo(res, productId);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Products that related to the retrieved product.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Suggested product.',
        suggestedProducts: [
          {
            _id: '6434128729b016ab84333d2d',
            name: 'GAP Men\'s Full Zip Fleece Logo Hoodie',
            price: 59.99,
            img: [
              'https://m.media-amazon.com/images/I/91uQsD2K2vL._AC_SX679_.jpg',
            ],
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('suggestedProducts')
  getSuggestedProducts(@Res({ passthrough: true }) res: Response): object {
    return this.productService.getSuggestedProducts(res);
  }
}
