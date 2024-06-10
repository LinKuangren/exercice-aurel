import type {ContentInterface} from "../../src/content_cache.ts";
import { describe, test, expect } from 'vitest';
import {getContent, convertDevise} from "../../src/main.ts";

import {server} from "./moke/node.ts";
import {contentConvertObject, contentListObject} from "./moke/mock_objects.ts";

server.listen();

describe('content', () => {
	test("get content list", async () => {
		const contentList: ContentInterface = await getContent();
		expect(contentList).toMatchObject(contentListObject);
	});

	test("convert content list", async () => {
		const contentList = await convertDevise("EUR", "USD");
		expect(contentList).toMatchObject(contentConvertObject);
	});
})
