package expo.modules.nativecard

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NativeCardModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("NativeCard")

    View(NativeCardView::class) {
      Prop("text") { view: NativeCardView, prop: String ->
        view.updateText(prop)
      }
    }
  }
}
