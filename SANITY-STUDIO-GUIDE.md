# Hướng Dẫn Làm Việc Với Sanity Studio

Tài liệu này hướng dẫn biên tập viên và lập trình viên làm việc với Sanity Studio hiện tại của Vietba Group.

## Truy Cập Studio

Sanity Studio đang được host tại:

```text
https://vietbagroup-cms.sanity.studio
```

Thông tin cấu hình hiện tại:

| Mục | Giá trị |
| --- | --- |
| Project ID | `yikjfnw2` |
| Dataset | `production` |
| Tên Studio deploy | `vietbagroup-cms` |
| File cấu hình Studio | `sanity.config.ts` |
| File cấu hình CLI | `sanity.cli.ts` |

Người dùng cần được mời vào Sanity project trước khi có thể sử dụng Studio. Quyền truy cập được quản lý trong dashboard của Sanity, không nằm trong repository này.

## Sanity Đang Quản Lý Nội Dung Nào

Repository đã có schema cho nhiều nhóm nội dung, nhưng website hiện tại chưa dùng toàn bộ dữ liệu từ Sanity.

| Loại nội dung trong Studio | Schema | Trạng thái trên website |
| --- | --- | --- |
| `Tin tức` | `article` | Đang được dùng bởi `/articles`, `/articles/[slug]`, `/en/articles`, `/en/articles/[slug]` |
| `Tin tuyển dụng` | `job` | Đã có schema và query helper, nhưng trang tuyển dụng hiện vẫn đọc từ `src/i18n/*.json` |
| `Dịch vụ` | `service` | Đã có schema và query helper; các trang dịch vụ hiện chủ yếu dùng nội dung tĩnh Astro/i18n |
| `Dự án` | `project` | Đã có schema và query helper; trang dự án hiện chủ yếu dùng nội dung tĩnh Astro/i18n |
| `Cột mốc` | `milestone` | Đã có schema và query helper; nội dung lịch sử hiện chủ yếu dùng nội dung tĩnh Astro/i18n |
| `Đối tác` | `partner` | Đã có schema và query helper; mức độ sử dụng trên website hiện còn hạn chế |
| `Cài đặt Website` | `siteSettings` | Đã có schema và query helper; phần khung website hiện chủ yếu dùng nội dung tĩnh Astro/i18n |

Trong công việc hằng ngày, hãy xem `Tin tức` là phần CMS đang hoạt động trực tiếp. Với các loại nội dung còn lại, cần kiểm tra trang đích đã được nối với Sanity hay chưa trước khi cam kết rằng thay đổi trong Studio sẽ xuất hiện trên website public.

## Quy Trình Xuất Bản Cho Biên Tập Viên

1. Mở `https://vietbagroup-cms.sanity.studio`.
2. Chọn loại nội dung cần chỉnh sửa.
3. Tạo tài liệu mới hoặc mở tài liệu hiện có.
4. Điền nội dung tiếng Việt và tiếng Anh nếu trường đó hỗ trợ hai ngôn ngữ.
5. Thêm hình ảnh qua các trường image của Sanity nếu schema có hỗ trợ.
6. Dùng hotspot/crop khi hình ảnh cần căn đúng nhân vật, logo, địa điểm hoặc sản phẩm.
7. Bấm publish khi nội dung đã sẵn sàng.
8. Rebuild/redeploy website nếu nội dung cần xuất hiện trên site production.

Website Astro lấy dữ liệu Sanity tại thời điểm build với `useCdn: false`. Vì vậy, chỉ publish trong Studio có thể chưa làm thay đổi bản website static đã deploy. Sau những thay đổi cần public, website cần được build hoặc deploy lại.

## Tin Tức

`Tin tức` là loại nội dung Sanity đang được website sử dụng trực tiếp nhất.

Trường bắt buộc:

- `Tiêu đề`: trường đa ngôn ngữ, gồm `Tiếng Việt` và `English`.
- `Nội dung`: chỉ có một ô nội dung dạng portable text dùng chung cho bài viết, không tách riêng `Tiếng Việt` và `English`. Nếu chèn hình trong nội dung, hình cần có alt text.

Trường nên điền:

- `Tóm tắt`: mô tả ngắn đa ngôn ngữ, dùng cho thẻ bài viết và phần tóm tắt.
- `Ảnh đại diện`: hình chính cho danh sách bài viết và trang chi tiết.
- `Alt Text`: bắt buộc với ảnh đại diện và ảnh trong nội dung, phục vụ SEO và accessibility.
- `Caption`: chú thích ảnh, không bắt buộc.

Các trường vận hành đang bị ẩn:

- `Custom URL Slug`: đang bị ẩn trong Studio. Nếu để trống, website dùng document ID của Sanity làm route.
- `Published`: đang bị ẩn và mặc định là `true`.
- `Published Date`: đang bị ẩn và mặc định là thời điểm tạo.
- `SEO Title` và `SEO Description`: đang bị ẩn ở thời điểm hiện tại.

Route bài viết:

- Danh sách tiếng Việt: `/articles`
- Chi tiết tiếng Việt: `/articles/{slug-hoac-document-id}`
- Danh sách tiếng Anh: `/en/articles`
- Chi tiết tiếng Anh: `/en/articles/{slug-hoac-document-id}`

Website chỉ lấy các bài viết có `isPublished` không phải `false`, sắp xếp theo `publishedAt` hoặc ngày tạo, mới nhất trước.

## Làm Việc Với Nội Dung Song Ngữ

Một số schema dùng object đa ngôn ngữ:

```text
Tiếng Việt
English
```

Với nội dung public, nên điền cả hai ngôn ngữ khi có thể. Nếu thiếu tiếng Anh, một số query của bài viết có fallback về tiếng Việt, nhưng không phải mọi query helper đều có cùng hành vi fallback. Không nên dựa vào fallback cho nội dung production cuối cùng.

## Hình Ảnh

Hãy dùng trường image của Sanity cho hình ảnh do CMS quản lý. Các schema hiện tại có hỗ trợ hotspot cho ảnh bài viết, dịch vụ, dự án, đối tác, tuyển dụng và ảnh dự án liên quan.

Quy tắc khi dùng hình:

- Luôn điền alt text khi field yêu cầu.
- Alt text nên ngắn, rõ, mô tả nội dung hình thay vì tên file.
- Dùng hotspot/crop khi hình cần hiển thị rõ người, logo, địa điểm hoặc sản phẩm.
- Không upload tài liệu, hình ảnh hoặc thông tin khách hàng chưa được duyệt để công khai.

Cấu hình Astro hiện cho phép ảnh từ Sanity CDN tại `cdn.sanity.io`.

## Tin Tuyển Dụng

Schema `Tin tuyển dụng` hỗ trợ:

- Tiêu đề công việc
- Slug
- Địa điểm
- Hình thức làm việc
- Tóm tắt
- Mô tả công việc
- Yêu cầu
- Quyền lợi
- Địa chỉ làm việc
- Thời gian làm việc
- Ảnh hero
- Trạng thái active
- Ngày đăng

Giới hạn quan trọng hiện tại: các trang tuyển dụng đang render dữ liệu từ `src/i18n/vi.json` và `src/i18n/en.json`, chưa render từ Sanity. Việc thêm hoặc sửa tin tuyển dụng trong Studio sẽ chưa làm thay đổi `/careers` hoặc `/en/careers` cho đến khi các trang này được chuyển sang dùng query job từ Sanity.

## Dịch Vụ, Dự Án, Cột Mốc, Đối Tác Và Cài Đặt Website

Các loại tài liệu này đã có trong Studio và có thể được seed từ JSON local, nhưng nhiều trang production hiện vẫn phụ thuộc vào file Astro tĩnh và nội dung trong `src/i18n`.

Ý nghĩa từng loại:

- `Dịch vụ`: tiêu đề dịch vụ, mô tả, điểm nổi bật, thành tựu, quy trình, case study, hình ảnh, slug trang chi tiết, thứ tự hiển thị.
- `Dự án`: tên dự án, danh mục, hình ảnh, mô tả, khách hàng, năm, trạng thái featured, thứ tự hiển thị.
- `Cột mốc`: năm hoặc nhãn, tiêu đề, mô tả, giá trị di sản, thành tựu nổi bật, icon key, thứ tự hiển thị.
- `Đối tác`: tên đối tác, logo, danh mục, viết tắt, địa điểm, mô tả, chuyên môn, website, thứ tự hiển thị.
- `Cài đặt Website`: tiêu đề site, mô tả, logo, nội dung hero, thống kê, văn phòng, mạng xã hội, nội dung footer.

Trước khi xem những loại này là nguồn dữ liệu chính, cần kiểm tra trang đích có import query tương ứng từ `src/lib/sanity.ts` hoặc `src/utils/sanity.ts` hay chưa.

## Quy Trình Cho Lập Trình Viên

Cài dependencies:

```sh
npm install
```

Chạy website local:

```sh
npm run dev
```

Chạy Sanity CLI:

```sh
npm run sanity -- --help
```

Deploy hoặc cập nhật hosted Studio:

```sh
npx sanity deploy --url vietbagroup-cms --schema-required
```

Seed nội dung JSON local vào Sanity:

```sh
npm run sanity:seed
```

Script seed đọc `src/i18n/vi.json` và `src/i18n/en.json`, upload hình local được tham chiếu, rồi upsert document bằng ID cố định. Script này hữu ích cho lần sync đầu hoặc migration có thể chạy lại, nhưng cần cẩn thận nếu biên tập viên đã sửa thủ công trong Studio vì seed có thể ghi đè các field đã seed.

## Biến Môi Trường

Config hiện đã có giá trị mặc định:

```env
PUBLIC_SANITY_PROJECT_ID=yikjfnw2
PUBLIC_SANITY_DATASET=production
```

Các biến `PUBLIC_` này chỉ định Sanity project và dataset public. Chúng không cấp quyền ghi dữ liệu.

Không bao giờ đưa các giá trị sau vào biến public hoặc code frontend:

- `SANITY_AUTH_TOKEN`
- write token
- admin token
- dữ liệu khách hàng riêng tư
- thông tin đăng nhập
- ghi chú nội bộ hoặc nội dung bảo mật chưa public

Ranh giới bảo mật thật sự nằm ở quyền truy cập dataset và cách quản lý token. Hãy xem dataset `production` là nơi chứa nội dung website public.

## Kỳ Vọng Khi Deploy

Website dùng Astro, Cloudflare adapter và Sanity integration. Nội dung Sanity được fetch trong quá trình build.

Sau khi thay đổi nội dung trong Studio:

1. Publish document trong Studio.
2. Trigger build/deploy website.
3. Kiểm tra route public bị ảnh hưởng.

Kiểm tra local:

```sh
npm run build
npm run preview
```

## Xử Lý Sự Cố

Nếu Studio không mở được:

- Kiểm tra người dùng đã được mời vào Sanity project chưa.
- Kiểm tra đúng URL hosted Studio: `https://vietbagroup-cms.sanity.studio`.
- Kiểm tra Studio đã được deploy bằng `npx sanity deploy --url vietbagroup-cms --schema-required`.

Nếu nội dung website không đổi sau khi publish:

- Kiểm tra trang liên quan có thật sự đọc từ Sanity hay không.
- Kiểm tra document đã được publish.
- Kiểm tra website đã được rebuild và redeploy.
- Kiểm tra route đang dùng đúng field ngôn ngữ mong muốn.

Nếu lệnh Sanity local bị lỗi:

- Chạy `npx sanity login`.
- Kiểm tra `.env` hoặc biến môi trường đang trỏ tới project `yikjfnw2` và dataset `production`.
- Với thao tác seed, kiểm tra `SANITY_AUTH_TOKEN` có sẵn hoặc token đăng nhập Sanity local đọc được.
