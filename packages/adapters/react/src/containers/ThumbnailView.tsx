// import { useData, useSelectedDataId } from "../hooks";
// import { Thumbnail, GridView } from "../components";

// export const ThumbnailView = (_: {}) => {
//   const [data] = useData();
//   const [__, setSelectedIndex] = useSelectedDataId();

//   return data ? (
//     <GridView>
//       {data.map(({ id }, index) => (
//         <Thumbnail
//           key={index}
//           src={""}
//           title={id}
//           author={id}
//           onClick={() => setSelectedIndex(id)}
//         />
//       ))}
//     </GridView>
//   ) : (
//     <></>
//   );
// };
