import * as React from "react";
import { render } from "@testing-library/react-native";

import { Text } from "../Text";

it(`renders correctly`, () => {
  const tree = render(<Text variant="body">Snapshot test!</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});
